import { Post } from './types';
import Link from 'next/link';

async function getPosts(): Promise<Post[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', { 
  
  });

  if (!res.ok) {
  
    throw new Error('Gagal mengambil data');
  }

  return res.json();
}

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Daftar Artikel</h1>
      <Table>
        <TableCaption>A list of your recent posts.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="font-medium">{post.id}</TableCell>
              <TableCell>{post.title}</TableCell>
              <TableCell>
                <Link
                  href={`/posts/${post.id}`}
                  className="inline-block bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-150 font-medium"
                >
                  Baca Selengkapnya
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}