import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Home,
  MessageSquare,
  Users,
  Rss,
  BookOpen,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function EventsPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Top Bar */}
        <div className="mb-8">
          <Input className="w-full" placeholder="Search" />
        </div>

        {/* Events Content */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Events</h2>

          {/* Filters */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Narrow your search</h3>
            <Accordion type="single" collapsible className="w-full">
              {["Date", "Place", "Topic", "Online / Offline"].map(
                (filter, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{filter}</AccordionTrigger>
                    <AccordionContent>
                      {/* Placeholder for filter content */}
                      <p>Filter options for {filter}</p>
                    </AccordionContent>
                  </AccordionItem>
                )
              )}
            </Accordion>
          </div>

          {/* Results Count */}
          <p className="text-sm text-gray-500 mb-4">2 of 5 results</p>

          {/* Event Cards */}
          {["AI-MI Workshop", "Flutter Workshop"].map((workshop, index) => (
            <Card key={index} className="mb-4">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{workshop}</h3>
                    <p className="text-gray-600 mb-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <div className="flex space-x-2">
                      {[1, 2, 3].map((_, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 bg-blue-100 rounded"
                        ></div>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">Wednesday</p>
                    <p>2.10.2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Pagination */}
          <div className="flex justify-between mt-6">
            <Button variant="outline" className="flex items-center">
              <ChevronLeft className="mr-2 h-4 w-4" /> Prev
            </Button>
            <Button className="flex items-center bg-purple-600 text-white hover:bg-purple-700">
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
