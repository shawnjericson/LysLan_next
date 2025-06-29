import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/vi', 'replace');  // "replace" tương đương 301 Permanent Redirect
}