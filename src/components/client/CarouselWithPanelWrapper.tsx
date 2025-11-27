"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import CarouselWithPanel from "@/components/CarouselWithPanel";

interface CarouselItem {
  id: number;
  image: string;
  title: string;
  description: string;
  category?: string;
  tags?: string[];
  url: string;
}

interface CarouselWithPanelWrapperProps {
  items: CarouselItem[];
  summaries: string[];
}

export default function CarouselWithPanelWrapper({
  items,
  summaries,
}: CarouselWithPanelWrapperProps) {
  const router = useRouter();

  const handleItemClick = useCallback(
    (id: number) => {
      // Encontrar a URL do item clicado
      const item = items.find((i) => i.id === id);
      if (item?.url) {
        router.push(item.url);
      }
    },
    [items, router],
  );

  return (
    <CarouselWithPanel
      items={items}
      summaries={summaries}
      onItemClick={handleItemClick}
    />
  );
}
