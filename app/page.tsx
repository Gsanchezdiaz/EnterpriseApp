import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";

export default async function Home() {
  const user = await prisma.user.findFirst();
  return (
    <div>
      <h1>Hola Mundo: {JSON.stringify(user)}</h1>
      <Button>Okis</Button>
    </div>
  );
}
