"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"

export function ProfileSkeleton() {
  return (
    <motion.div
      className="bg-[#1A0F34] rounded-xl overflow-hidden shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Banner */}
      <Skeleton className="h-48 w-full rounded-none" />

      {/* Profile content */}
      <div className="px-8 pb-8 relative">
        {/* Profile picture */}
        <div className="absolute -top-16 left-8">
          <Skeleton className="h-32 w-32 rounded-full border-4 border-[#1A0F34]" variant="circle" />
        </div>

        {/* Header section */}
        <div className="pt-20 flex justify-between items-start mb-8">
          <div className="w-full max-w-md">
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-6 w-48 mb-4" />
          </div>
          <Skeleton className="h-10 w-32" variant="button" />
        </div>

        {/* Social links */}
        <div className="flex gap-4 mt-4">
          <Skeleton className="h-12 w-12 rounded-md" />
          <Skeleton className="h-12 w-12 rounded-md" />
          <Skeleton className="h-12 w-12 rounded-md" />
        </div>

        {/* Location and website */}
        <div className="mt-4">
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-6 w-64" />
        </div>

        {/* About section */}
        <div className="mt-8">
          <Skeleton className="h-7 w-32 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Additional sections */}
        <div className="mt-8">
          <Skeleton className="h-7 w-48 mb-4" />
          <div className="flex gap-3">
            <Skeleton className="h-10 w-32 rounded-full" />
            <Skeleton className="h-10 w-32 rounded-full" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

