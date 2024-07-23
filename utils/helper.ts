import { getCloudConfig, getCloudSignature } from "@/app/admin/products/action";

export const uploadImage = async (file: File) => {
  const { timestamp, signature } = await getCloudSignature();
  const { name, key } = await getCloudConfig();

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", key);
  formData.append("signature", signature);
  formData.append("timestamp", timestamp.toString());

  const url = `http://api.cloudinary.com/v1_1/${name}/image/upload`;

  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });

  const { secure_url, public_id } = await res.json();

  return {
    url: secure_url,
    id: public_id,
  };
};

export const formatPrice = (amount: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(amount);
};

export const extraPublicId = (url: string) => {
  const splittedData = url.split("/");
  const lastItem = splittedData[splittedData.length - 1];
  return lastItem.split(".")[0];
};
