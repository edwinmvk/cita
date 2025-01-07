"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Position {
  x: number;
  y: number;
}

interface Props {
  children?: React.ReactNode;
}

export default function DraggableDiv({ children }: Props) {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });
  const divRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const constrainPosition = (newX: number, newY: number): Position => {
    if (!divRef.current || !containerRef.current) return { x: newX, y: newY };

    const rect = divRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    // Constrain X position within container bounds
    const maxX = containerRect.width - rect.width;
    const constrainedX = Math.min(Math.max(0, newX), maxX);

    // Constrain Y position within container bounds
    const maxY = containerRect.height - rect.height;
    const constrainedY = Math.min(Math.max(0, newY), maxY);

    return { x: constrainedX, y: constrainedY };
  };

  const handleDragStart = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ): void => {
    setIsDragging(true);

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    setDragStart({
      x: clientX - position.x,
      y: clientY - position.y,
    });
  };

  const handleDrag = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ): void => {
    if (!isDragging) return;

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    const newPosition: Position = {
      x: clientX - dragStart.x,
      y: clientY - dragStart.y,
    };

    const constrainedPosition = constrainPosition(newPosition.x, newPosition.y);
    setPosition(constrainedPosition);
  };

  const handleDragEnd = (): void => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleResize = (): void => {
      setPosition((prevPosition) =>
        constrainPosition(prevPosition.x, prevPosition.y)
      );
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <Card
        ref={divRef}
        className={`absolute cursor-grab select-none shadow-lg z-50 ${
          isDragging ? "cursor-grabbing" : ""
        }`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: isDragging ? "none" : "transform 0.1s ease-in-out",
        }}
        onMouseDown={handleDragStart}
        onMouseMove={handleDrag}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDrag}
        onTouchEnd={handleDragEnd}
      >
        <div className="flex items-center gap-2">
          <div className="space-y-1 rounded-xl bg-white p-3 shadow-lg">
            <div>
              <h1 className="text-md">Hello</h1>
              <h2 className="text-2xl font-bold">Edwin,</h2>
            </div>
            <div>
              <p className="text-md">Job role:</p>
              <p className="text-lg font-semibold text-purple-600">
                Frontend Dev
              </p>
            </div>
            <div>
              <p className="text-md">Time elapsed:</p>
              <p className="text-2xl font-bold">00:00</p>
            </div>
            <Button
              className="w-full bg-emerald-500 hover:bg-emerald-600"
              size="sm"
              onClick={() => {}}
            >
              Start Session
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
