import Link from "next/link"; 

export default function Home() {
  return (
    <>
      <h1 className="title">
        Read <Link href="/Addusers">this page!</Link>
      </h1>
      <h1 className="title">
        Read <Link href="/Listdata">this page!</Link>
      </h1>
      <h1 className="title">
        Read <Link href="/View">this page!</Link>
      </h1>
    </>
  );
}