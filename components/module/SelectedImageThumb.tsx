import Image from "next/image";

interface SelectedImageThumbProps {
  src?: string;
}

const SelectedImageThumb = ({ src }: SelectedImageThumbProps) => {
  if (!src) return null;

  return (
    <div className="w-20 h-20 relative">
      <Image
        src={src}
        alt="product"
        fill
        className="object-fill rounded bg-blue-gray-200"
      />
    </div>
  );
};

export default SelectedImageThumb;
