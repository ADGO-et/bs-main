"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Heart, ExternalLink, MessageSquare } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface SupportSectionProps {
  id: string;
  type: "startup" | "hiwot";
  fundingGoal: number;
  fundingProgress: number;
  backersCount: number;
  howLong: number;
  isLiked: boolean;
  likesCount: number;
  onLike: () => void;
  onSupport: () => void;
  comments: Array<{
    _id: string;
    author: any;
    content: string;
    createdAt: string;
  }>;
  newComment: string;
  setNewComment: (v: string) => void;
  onAddComment: () => void;
  commentsLoading: boolean;
  commentsError: boolean;
  postingComment: boolean;
}

export function SupportSection({
  fundingGoal,
  fundingProgress,
  backersCount,
  howLong,
  isLiked,
  likesCount,
  onLike,
  onSupport,
  comments,
  newComment,
  setNewComment,
  onAddComment,
  commentsLoading,
  commentsError,
  postingComment,
}: SupportSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold mb-4">Funding Progress</h2>
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            ETB {Number(fundingGoal).toLocaleString()}
          </span>
          <span className="text-sm font-medium">{fundingProgress}% Funded</span>
        </div>
        <Progress value={fundingProgress || 0} className="h-2" />
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800">{backersCount}</div>
          <div className="text-sm text-gray-600">Supporters</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800">{howLong}</div>
          <div className="text-sm text-gray-600">Days to Go</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-gray-800">
            ETB {Number(fundingGoal).toLocaleString("en-ET")}
          </div>
          <div className="text-sm text-gray-600">Goal</div>
        </div>
      </div>
      <Button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white mb-2"
        onClick={onSupport}
      >
        Support Now
      </Button>
      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2 mb-4"
        onClick={onLike}
      >
        <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
        <span>
          {likesCount} Like{likesCount === 1 ? "" : "s"}
        </span>
      </Button>
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <MessageSquare className="text-blue-500" size={20} />
          Community Discussion
        </h2>
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
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts about this project..."
          className="mb-3 border-black"
          disabled={postingComment}
        />
        <Button
          onClick={onAddComment}
          className="bg-blue-600 hover:bg-blue-700"
          disabled={postingComment}
        >
          {postingComment ? "Posting..." : "Post Comment"}
        </Button>
      </div>
    </div>
  );
}
