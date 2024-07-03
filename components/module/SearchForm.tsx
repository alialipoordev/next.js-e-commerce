import { Input } from "@material-tailwind/react";
import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function SearchForm() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query) return;
    router.push(`/admin/products/search?query=${query}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full md:w-72">
      <Input
        label="Search"
        icon={
          <button>
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        }
        value={query}
        onChange={({ target }) => setQuery(target.value)}
      />
    </form>
  );
}
