"use client";

import { useState, useEffect } from "react";
import {
  useGetHiwotByIdQuery,
  useGetHiwotCommentsQuery,
  usePostHiwotCommentMutation,
  useLikeOrDislikeHiwotMutation,
} from "@/redux/api/hiwotApi";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Phone,
  Mail,
  CheckCircle,
  Heart,
  ExternalLink,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import placeholderimg from "@/public/hiwot-placeholder.png";
import { useSelector } from "react-redux";
import { useGetUserByIdQuery } from "@/redux/api/userApi";
import { PaymentDialog } from "./Dialog-files/PaymentDialog";

export default function HiwotDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : undefined;

  const {
    data: response,
    isLoading,
    isError,
    refetch,
  } = useGetHiwotByIdQuery(id ?? "", { skip: !id });
  const hiwot = response?.data;
  const userId = useSelector((state: any) => state.auth?.user?.id);
  const { data: user, refetch: refetchUser } = useGetUserByIdQuery(userId);

  // Comments
  const {
    data: commentsData,
    isLoading: commentsLoading,
    isError: commentsError,
    refetch: refetchComments,
  } = useGetHiwotCommentsQuery(id, { skip: !id });
  const [postComment, { isLoading: postingComment }] =
    usePostHiwotCommentMutation();
  const comments = Array.isArray(commentsData?.data) ? commentsData.data : [];

  // Like
  const [likeOrDislikeHiwot, { isLoading: likeLoading }] =
    useLikeOrDislikeHiwotMutation();
  const serverLikesCount = hiwot?.likesCount || 0;
  const [isLiked, setIsLiked] = useState(false);
  const [localLikesCount, setLocalLikesCount] =
    useState<number>(serverLikesCount);

  useEffect(() => {
    if (!hiwot) return;
    // If your user object has likedHiwots, check if this hiwot is liked
    const likedHiwots: string[] = Array.isArray(user?.data)
      ? user.data[0]?.author?.likedHiwots ?? []
      : user?.data?.likedHiwots ?? [];
    setIsLiked(Boolean(hiwot._id && likedHiwots.includes(hiwot._id)));
    setLocalLikesCount(serverLikesCount);
  }, [user, hiwot, serverLikesCount]);

  const handleLike = async () => {
    if (!id) return;
    const prevLiked = isLiked;
    setIsLiked(!prevLiked);
    setLocalLikesCount((c) => (prevLiked ? Math.max(0, c - 1) : c + 1));
    try {
      await likeOrDislikeHiwot(id).unwrap();
      await Promise.all([refetch(), refetchUser()]);
    } catch (err) {
      setIsLiked(prevLiked);
      setLocalLikesCount((c) => (prevLiked ? c + 1 : Math.max(0, c - 1)));
      // Optionally show error toast
    }
  };

  // Support (payment) - implement as needed
  const handleSupport = () => {
    // Open payment dialog or redirect
  };

  // Comment
  const [newComment, setNewComment] = useState("");
  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      await postComment({
        id,
        content: newComment,
        startup: hiwot?._id,
      }).unwrap();
      setNewComment("");
      refetchComments();
    } catch (error) {
      // Optionally show error toast
    }
  };

  const handleBack = () => {
    router.push("/hiwot/overview");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-0 pb-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError || !hiwot) {
    return (
      <div className="min-h-screen pt-0 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Hiwot Fund Not Found</h2>
          <Button
            onClick={handleBack}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Back to Hiwot Funds
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-0 pb-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="mb-6 m-3">
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2"
            onClick={handleBack}
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Hiwot Funds
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6 pt-0">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="relative h-32 w-32 rounded-full overflow-hidden mb-4">
                  <Image
                    src={placeholderimg}
                    alt={`${hiwot.firstName} ${hiwot.lastName}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <h1 className="text-2xl font-bold">{`${hiwot.firstName} ${hiwot.lastName}`}</h1>
                <p className="text-gray-600">{hiwot.description}</p>
                <div className="mt-2">
                  <span className="inline-flex items-center text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                    <CheckCircle size={12} className="mr-1" />
                    {hiwot.status}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600">{hiwot.phoneNumber}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">{hiwot.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="h-5 w-5 text-gray-500 mt-0.5">🌍</span>
                  <div>
                    <p className="font-medium">Country</p>
                    <p className="text-gray-600">{hiwot.countryOfResidence}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Detailed Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6 pt-0">
              <h2 className="text-xl font-bold mb-4">
                {hiwot.firstName}'s Story
              </h2>
              <p className="text-gray-600 mb-6">{hiwot.description}</p>
              <div className="space-y-6">
                <h2 className="text-xl font-bold mb-4">Video Message</h2>
                <div className="relative pt-[56.25%] bg-gray-100 rounded-lg overflow-hidden">
                  <iframe
                    src={hiwot.videoLink}
                    className="absolute top-0 left-0 w-full h-full"
                    title="Applicant Video"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="flex justify-end">
                  <a
                    href={hiwot.videoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink size={16} />
                      <span>Open Video</span>
                    </Button>
                  </a>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mt-6">
                <h3 className="font-medium mb-2">Condition</h3>
                <p className="text-gray-600">{hiwot.description}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Funding Progress</h2>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">
                    ETB {Number(hiwot.fundingGoal).toLocaleString()}
                  </span>
                  <span className="text-sm font-medium">
                    {hiwot.fundingProgress}% Funded
                  </span>
                </div>
                <Progress value={hiwot.fundingProgress || 0} className="h-2" />
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">
                    {hiwot.backersCount}
                  </div>
                  <div className="text-sm text-gray-600">Supporters</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">
                    {hiwot.campaignDuration}
                  </div>
                  <div className="text-sm text-gray-600">Days to Go</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-800">
                    ETB {Number(hiwot.fundingGoal).toLocaleString("en-ET")}
                  </div>
                  <div className="text-sm text-gray-600">Goal</div>
                </div>
              </div>
              <PaymentDialog hiwotId={hiwot._id} type="hiwot">
                <Button
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white mb-2"
                  onClick={handleSupport}
                >
                  Support Now
                </Button>
              </PaymentDialog>
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 mb-4"
                onClick={handleLike}
                disabled={likeLoading}
              >
                <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
                <span>
                  {localLikesCount} Like{localLikesCount === 1 ? "" : "s"}
                </span>
                {likeLoading ? "..." : isLiked ? "Liked" : "Like"}
              </Button>
            </div>

            {/* Comments Section */}
            <div className="w-full mt-12 bg-gradient-to-r from-blue-100 to-blue-300 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MessageSquare className="text-blue-500" size={20} />
                Community Discussion
              </h2>
              {/* Comments List */}
              <div className="space-y-6 mb-6">
                {commentsLoading ? (
                  <p className="text-gray-500 text-center py-4">
                    Loading comments...
                  </p>
                ) : commentsError ? (
                  <p className="text-red-500 text-center py-4">
                    Failed to load comments.
                  </p>
                ) : comments.length > 0 ? (
                  comments.map((comment) => (
                    <div key={comment._id} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          {comment.author?.firstName?.[0] || "U"}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">
                            {comment.author?.firstName &&
                            comment.author?.lastName
                              ? `${comment.author.firstName} ${comment.author.lastName}`
                              : comment.author?.username ||
                                comment.author?.email ||
                                "Unknown"}
                          </p>
                          <span className="text-sm text-gray-500">
                            {new Date(comment.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-gray-600 mt-1">{comment.content}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    No comments yet. Be the first to share your thoughts!
                  </p>
                )}
              </div>
              {/* Add Comment Box */}
              <div className="mb-6">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts about this project..."
                  className="mb-3 border-black"
                  disabled={postingComment}
                />
                <Button
                  onClick={handleAddComment}
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={postingComment}
                >
                  {postingComment ? "Posting..." : "Post Comment"}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
