import prisma from "@/lib/prisma";

export default async function Home() {
  const user = await prisma.user.findFirst();
  return (
    <div>Hola Mundo: {JSON.stringify(user)}</div>
  );
}
