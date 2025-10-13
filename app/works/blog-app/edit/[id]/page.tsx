import EditPostClient from "../../components/EditPostClient";

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  return <EditPostClient id={id} />;
}
