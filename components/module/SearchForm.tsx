import { Input } from "@material-tailwind/react";
import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";

interface SearchFormProps {
  submitTo: string;
}

export default function SearchForm({ submitTo }: SearchFormProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const params = useSearchParams();
  const searchQuery = params.get("query") || "";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query) return;
    router.push(`${submitTo}${query}`);
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
        value={query || searchQuery}
        onChange={({ target }) => setQuery(target.value)}
      />
    </form>
  );
}
