import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import { cn } from "@/lib/utils";
import { Student, User } from "@/types";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ProfilePageProps = {
  params: {
    userId: string;
  };
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const userId = params.userId;

  const { data } = await axios<User & { student: Student }>({
    method: "get",
    endpoint: `/user/${userId}`,
  });

  const user = data?.data;

  if (!user) {
    throw new Error("User not found!!");
  }

  return (
    <div className="bg-gray-100 grid place-items-center py-4">
      <div className="bg-white rounded-lg w-full max-w-screen-md p-6 border border-gray-300 shadow-lg">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center flex-col lg:flex-row justify-center w-full">
            <Image
              className="w-32 h-32 rounded-full border-2 border-purple-500"
              src={user?.student?.profilePicture || "/images/nature.jpg"}
              alt="Profile"
              width={200}
              height={200}
            />
            <div className="ml-6">
              <h2 className="text-3xl font-bold text-gray-800 capitalize">
                {user.username}
              </h2>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600 text-sm">
                Joined on {moment(user.createdAt).format("MMMM YYYY")}
              </p>
            </div>
          </div>
          {/* <Button>Edit Profile</Button> */}
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">About</h3>
          {user?.student?.bio ? (
            // <></>
            <p className="text-gray-700">
              Enthusiastic software developer with a passion for building
              scalable web applications and working with cutting-edge
              technologies. In my free time, I love to explore new frameworks,
              read tech blogs, and contribute to open-source projects.
            </p>
          ) : (
            // <Link href={`/user/${user._id}/edit`} className="my-2 underline">
            //   Add bio
            // </Link>
            <p>No About</p>
          )}
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Education
          </h3>
          <div className="space-y-1.5">
            <p className="text-gray-700 text-lg font-medium">
              {user.student.college}
            </p>
            <p className="text-gray-700">
              {user.student.course}-{user.student.yearOfEnding}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Interests
          </h3>
          <ul className="flex space-x-4">
            {user.student.interests.length > 0 ? (
              <>
                {user.student.interests.map((e, i) => (
                  <button
                    key={i}
                    className={cn(
                      "rounded-full py-1 px-5 bg-primary/10 border border-primary/30 shadow-md hover:bg-primary hover:text-white transition-all duration-300 ease-in-out capitalize"
                    )}
                  >
                    {e}
                  </button>
                ))}
              </>
            ) : (
              <>
                <li className="bg-purple-200 text-purple-800 px-4 py-2 rounded-lg">
                  Open Source
                </li>
                <li className="bg-purple-200 text-purple-800 px-4 py-2 rounded-lg">
                  Machine Learning
                </li>
                <li className="bg-purple-200 text-purple-800 px-4 py-2 rounded-lg">
                  Blockchain
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
