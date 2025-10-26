import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Post } from "../page";

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={posts.map((post) => post.id).join(",") ?? "all"}
        className="space-y-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.1 }}
      >
        {posts.map((post) => (
          <motion.div
            key={post.id}
            layout
            className="border p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition"
            whileHover={{ scale: 1.002 }}
          >
            <Link href={`/works/blog/${post.id}`}>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-sm text-gray-600">
                {post.tags?.map((t: string, i: number) => (
                  <span
                    key={`${t}-${i}`}
                    className="text-sm bg-gray-100 px-2 py-1 rounded-full"
                  >
                    #{t}
                  </span>
                ))}
              </p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}