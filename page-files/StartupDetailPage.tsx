"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Heart,
  ExternalLink,
  MessageSquare,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useRouter, useParams } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import {
  useGetSingleVerifiedStartupQuery,
  useGetStartupCommentsQuery,
  useLikeOrDislikeStartupMutation,
  usePostStartupCommentMutation,
} from "@/redux/api/startupApi";
import { PaymentDialog } from "./Dialog-files/PaymentDialog";
import { useGetUserByIdQuery } from "@/redux/api/userApi";
import { useSelector } from "react-redux";

export default function StartupDetailPage() {
  const params = useParams();
  const id =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : undefined;

  const userId = useSelector((state: any) => state.auth.user.id);

  const {
    data,
    isLoading,
    isError,
    refetch: refetchProject,
  } = useGetSingleVerifiedStartupQuery(id);
  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
    refetch: refetchUser,
  } = useGetUserByIdQuery(userId);

  const project = data?.data?.startup;
  const serverLikesCount = data?.data?.likesCount || 0;
  console.log("this is a project", project);

  const [likeOrDislikeStartup, { isLoading: likeLoading }] =
    useLikeOrDislikeStartupMutation();
  const [likeStatus, setLikeStatus] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [localLikesCount, setLocalLikesCount] =
    useState<number>(serverLikesCount);

  useEffect(() => {
    if (!project) return;
    const likedStartups: string[] = Array.isArray(user?.data)
      ? user.data[0]?.author?.likedStartups ?? []
      : user?.data?.likedStartups ?? [];
    setIsLiked(Boolean(project._id && likedStartups.includes(project._id)));
    setLocalLikesCount(serverLikesCount);
  }, [user, project, serverLikesCount]);
  const handleLike = async () => {
    if (!id) return;
    const prevLiked = isLiked;
    setIsLiked(!prevLiked);
    setLocalLikesCount((c) => (prevLiked ? Math.max(0, c - 1) : c + 1));

    try {
      await likeOrDislikeStartup(id).unwrap();
      await Promise.all([refetchProject(), refetchUser()]);
    } catch (err) {
      // revert on error
      setIsLiked(prevLiked);
      setLocalLikesCount((c) => (prevLiked ? c + 1 : Math.max(0, c - 1)));
      console.error("Failed to toggle like:", err);
    }
  };

  const {
    data: commentsData,
    isLoading: commentsLoading,
    isError: commentsError,
    refetch: refetchComments,
  } = useGetStartupCommentsQuery(id, { skip: !id });
  const [postComment, { isLoading: postingComment }] =
    usePostStartupCommentMutation();

  const [newComment, setNewComment] = useState("");
  const router = useRouter();

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;
    try {
      await postComment({ startupId: id, content: newComment }).unwrap();
      setNewComment("");
      refetchComments();
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = () => {
    router.push("/");
  };

  const getYouTubeVideoId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const isValidVideoUrl = (url: string) => {
    return (
      url &&
      (url.includes("youtube.com") ||
        url.includes("youtu.be") ||
        url.includes("vimeo.com") ||
        url.includes(".mp4") ||
        url.includes(".webm"))
    );
  };

  const getDaysToGo = (expiryDate: string | undefined) => {
    if (!expiryDate) return 0;
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diff = expiry.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  const daysToGo = getDaysToGo(project?.postExpiryDate);

  // Helper to safely derive an initial from author (string or object)
  const getAuthorInitial = (author: unknown) => {
    if (!author) return "U";
    if (typeof author === "string") return author[0] || "U";
    if (typeof author === "object") {
      const a = author as {
        firstName?: string;
        username?: string;
        email?: string;
      };
      return a.firstName?.[0] || a.username?.[0] || a.email?.[0] || "U";
    }
    return "U";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-0 pb-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="min-h-screen pt-0 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
          <p className="text-gray-600 mb-6">
            The project you are looking for does not exist.
          </p>
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={handleBack}
          >
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-10 pb-16 relative overflow-hidden bg-gradient-to-b from-blue-50 to-white ">
      <div className="container mx-auto px-4">
        {/* Back to Projects button at the top left */}
        <div className="mb-6 flex items-center">
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2"
            onClick={handleBack}
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Projects
          </Button>
        </div>

        {/* Project Header: Logo, Name, Description */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="relative h-24 w-24 rounded-full overflow-hidden mb-4 border-4 border-blue-100 shadow">
            <Image
              src={project.companyLogo || "/placeholder.png"}
              alt={project.companyName || "Company"}
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2">{project.companyName}</h1>
          <p className="text-gray-600 text-lg max-w-4xl mb-2">
            {project.description}
          </p>
        </div>

        {/* Video + Funding side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 items-stretch">
          {project.videoLink && isValidVideoUrl(project.videoLink) && (
            <div className="bg-white rounded-xl shadow-lg p-6 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <Play className="text-blue-500" size={20} />
                <h2 className="text-xl font-bold">
                  Startup Introduction Video
                </h2>
              </div>
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
                {project.videoLink.includes("youtube.com") ||
                project.videoLink.includes("youtu.be") ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                      project.videoLink
                    )}`}
                    title="Project Video"
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : project.videoLink.includes("vimeo.com") ? (
                  <iframe
                    src={`https://player.vimeo.com/video/${project.videoLink
                      .split("/")
                      .pop()}`}
                    title="Project Video"
                    className="w-full h-full"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    controls
                    className="w-full h-full object-cover"
                    preload="metadata"
                  >
                    <source src={project.videoLink} type="video/mp4" />
                    <source src={project.videoLink} type="video/webm" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </div>
          )}
          {/* Funding Info Card */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl shadow-lg p-8 flex flex-col gap-6 h-full">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-blue-100 text-blue-700 font-semibold text-xs px-3 py-1 rounded-full shadow-sm">
                  {project.status || "Status"}
                </Badge>
                <Badge
                  variant="outline"
                  className="border-gray-200 text-gray-600"
                >
                  {project.location || "Location"}
                </Badge>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">
                  ETB {project.fundingGoal?.toLocaleString() || "0"} goal
                </span>
                <span className="text-sm font-medium">
                  {project.fundingProgress || 0}% Funded
                </span>
              </div>
              <Progress value={project.fundingProgress || 0} className="h-3" />
            </div>
            <div className="flex items-center gap-8 text-lg font-semibold mb-4">
              <div className="flex flex-col items-center">
                <span className="text-2xl text-blue-700">
                  {project.backersCount ?? 0}
                </span>
                <span className="text-xs text-gray-500">Backers</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl text-blue-700">{daysToGo}</span>
                <span className="text-xs text-gray-500">Days To Go</span>
              </div>
            </div>
            <PaymentDialog startupId={project._id}>
              <Button className="bg-blue-600 hover:bg-blue-700 text-lg py-4 font-bold mb-4">
                Support This Project
              </Button>
            </PaymentDialog>
            <div className="flex gap-4 items-center justify-between mt-2 w-full">
              <Button
                variant="ghost"
                aria-label="Like"
                className="flex items-center gap-2 text-red-500 hover:bg-red-100 transition"
                onClick={handleLike}
                disabled={likeLoading}
              >
                <Heart
                  size={22}
                  fill={isLiked ? "currentColor" : "none"}
                  stroke="currentColor"
                />
                <span className="ml-1 text-base font-semibold">
                  {localLikesCount}
                </span>
                {likeLoading ? "..." : isLiked ? "Liked" : "Like"}
              </Button>
              {likeStatus && (
                <span className="text-xs text-gray-500">{likeStatus}</span>
              )}
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-transparent"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                }}
              >
                <ExternalLink size={20} />
                Share Link
              </Button>
            </div>
          </div>
        </div>

        {/* Startup Details card moved below */}
        <div className="bg-white border border-blue-200 hover:scale-105 duration-300 rounded-xl shadow-sm p-6 flex flex-col gap-4 mb-10">
          <h2 className="text-xl font-bold mb-2">Startup Details</h2>
          <ul className="text-gray-700 grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8">
            <li>
              <span className="font-semibold">First Name:</span>{" "}
              {project.firstName}
            </li>
            <li>
              <span className="font-semibold">Last Name:</span>{" "}
              {project.lastName}
            </li>
            <li>
              <span className="font-semibold">Phone Number:</span>{" "}
              {project.phoneNumber}
            </li>
            <li>
              <span className="font-semibold">Status:</span> {project.status}
            </li>
            <li>
              <span className="font-semibold">Expired:</span>{" "}
              {project.isExpired ? "Yes" : "No"}
            </li>
            <li>
              <span className="font-semibold">Post Expiry Date:</span>{" "}
              {project.postExpiryDate
                ? new Date(project.postExpiryDate).toLocaleDateString()
                : "N/A"}
            </li>
          </ul>
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
            ) : commentsData?.data?.length > 0 ? (
              commentsData.data.map((comment) => (
                <div key={comment._id} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      {getAuthorInitial(comment.author)}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">
                        {comment.author?.firstName && comment.author?.lastName
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
      </div>
    </div>
  );
}
