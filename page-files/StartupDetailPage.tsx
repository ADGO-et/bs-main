"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Heart, ExternalLink, MessageSquare } from "lucide-react";
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

export default function StartupDetailPage() {
  const params = useParams();
  const id =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : undefined;

  const { data, isLoading, isError } = useGetSingleVerifiedStartupQuery(id);
  const project = data?.data;

  const [likeOrDislikeStartup, { isLoading: likeLoading }] =
    useLikeOrDislikeStartupMutation();
  const [likeStatus, setLikeStatus] = useState<string | null>(null);

  const handleLike = async () => {
    if (!id) return;
    try {
      const res = await likeOrDislikeStartup(id).unwrap();
      setLikeStatus(res.data.message); // "Startup liked." or "Startup disliked."
    } catch (error) {
      setLikeStatus("Failed to update like status.");
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
      // Optionally show error toast
    }
  };

  const handleBack = () => {
    router.push("/startup/projects");
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
    <div className="min-h-screen pt-0 pb-16 relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
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
          <p className="text-gray-600 text-lg max-w-2xl mb-2">
            {project.description}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Left: Project Details */}
          <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col gap-4">
            <div>
              <h2 className="text-xl font-bold mb-2">Startup Details</h2>
              <ul className="text-gray-700 space-y-2">
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
                  <span className="font-semibold">Email:</span> {project.email}
                </li>
                <li>
                  <span className="font-semibold">Bank Name:</span>{" "}
                  {project.bankName}
                </li>
                <li>
                  <span className="font-semibold">
                    Bank Account Holder Name:
                  </span>{" "}
                  {project.bankAccountHolderName}
                </li>
                <li>
                  <span className="font-semibold">Bank Account Number:</span>{" "}
                  {project.bankAccountNumber}
                </li>
                <li>
                  <span className="font-semibold">Swift Code:</span>{" "}
                  {project.swiftCode || "N/A"}
                </li>
                <li>
                  <span className="font-semibold">Status:</span>{" "}
                  {project.status}
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
                <li>
                  <span className="font-semibold">Created At:</span>{" "}
                  {project.createdAt
                    ? new Date(project.createdAt).toLocaleString()
                    : "N/A"}
                </li>
                <li>
                  <span className="font-semibold">Updated At:</span>{" "}
                  {project.updatedAt
                    ? new Date(project.updatedAt).toLocaleString()
                    : "N/A"}
                </li>
                <li>
                  <span className="font-semibold">Creator ID:</span>{" "}
                  {project.creatorId}
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Funding Info Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col gap-6">
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
                <span className="text-2xl text-blue-700">
                  {project.howLong ?? 0}
                </span>
                <span className="text-xs text-gray-500">Days To Go</span>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-lg py-4 font-bold mb-4">
              Support This Project
            </Button>
            {/* Share and Like Buttons */}
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
                  fill={
                    likeStatus === "Startup liked." ? "currentColor" : "none"
                  }
                  stroke={
                    likeStatus === "Startup liked."
                      ? "currentColor"
                      : "currentColor"
                  }
                />
                {likeLoading
                  ? "..."
                  : likeStatus === "Startup liked."
                  ? "Liked"
                  : "Like"}
              </Button>
              {likeStatus && (
                <span className="text-xs text-gray-500">{likeStatus}</span>
              )}
              <Button
                variant="outline"
                className="flex items-center gap-2"
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
        {/* Comments Section */}
        <div className="max-w-2xl mx-auto mt-12 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <MessageSquare className="text-blue-500" size={20} />
            Community Discussion
          </h2>
          {/* Comments List */}
          <div className="max-w-2xl mx-auto mt-12 bg-white rounded-xl shadow-sm p-6">
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
                        {typeof comment.author === "string"
                          ? comment.author.charAt(0)
                          : comment.author?.firstName?.charAt(0) ||
                            comment.author?.username?.charAt(0) ||
                            "U"}
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
                className="mb-3"
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
    </div>
  );
}
