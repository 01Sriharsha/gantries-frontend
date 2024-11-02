import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Palette, User, Users } from "lucide-react";
import { APP_TITLE } from "@/utils/constants";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Home",
  description: `Home page of ${APP_TITLE}`,
};

export default async function HomePage() {
  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-primary text-white py-20 px-4">
          <div className="container mx-auto flex flex-col lg:flex-row justify-center gap-4">
            <div className="md:w-1/2">
              <h1 className="text-4xl font-bold mb-4">
                Unleash Your Entrepreneurial Potential with {APP_TITLE}
              </h1>
              <p className="mb-8">
                Empower your campus and local community through decentralized
                digital commerce
              </p>
              <Link href={"/register"}>
                <Button
                  variant="default"
                  className="bg-white text-primary hover:bg-white"
                >
                  Join the Movement
                </Button>
              </Link>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/images/colab.jpg" // Replace with the actual image path
                alt="Hero Image"
                width={500}
                height={500}
                className="h-full rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto text-center">
            <div className="flex flex-col md:flex-row justify-around gap-4">
              <div className="bg-white p-6 rounded-lg shadow-md mb-8 md:mb-0">
                <div className="text-primary text-3xl mb-4 space-y-4 grid place-items-center">
                  <User size={"4rem"} />
                  Become Leader
                </div>
                <p>
                  Develop leadership skills that empower you to drive change and
                  inspire others in your community.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md mb-8 md:mb-0">
                <div className="text-primary text-3xl mb-4 space-y-4 grid place-items-center">
                  <Users size={"4rem"} />
                  Become Social
                </div>
                <p>
                  {" "}
                  Enhance your social skills to build meaningful connections and
                  contribute positively to society.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-primary text-3xl mb-4 space-y-4 grid place-items-center">
                  <Palette size={"4rem"} />
                  Make your Artwork
                </div>
                <p>
                  {" "}
                  Turn your ideas into reality by building a business that makes
                  an impact in your community.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="bg-white py-16">
        {/* About Us Section */}
        <section className="text-center mb-16">
          <p className="text-primary text-lg font-semibold">About us</p>
          <h2 className="text-4xl font-bold text-gray-900 mt-2">
            What is Gantries by eSamudaay?
          </h2>
        </section>

        {/* Cards Section */}
        <div className="container mx-auto flex flex-col md:flex-row justify-around mb-16">
          <Card className="bg-primary text-white w-full md:w-1/3 m-2 p-6 rounded-lg shadow-md">
            <CardHeader className="font-bold text-xl">Empowerment</CardHeader>
            <CardContent>
              <p>
                Gantries by eSamudaay empowers campus communities to launch
                digital businesses using ONDC protocols.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white text-gray-900 w-full md:w-1/3 m-2 p-6 rounded-lg shadow-md">
            <CardHeader className="font-bold text-xl">Localization</CardHeader>
            <CardContent>
              <p>
                A platform that localizes digital commerce by embedding
                ONDC-powered tools within campus networks
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white text-gray-900 w-full md:w-1/3 m-2 p-6 rounded-lg shadow-md">
            <CardHeader className="font-bold text-xl">
              Transformation
            </CardHeader>
            <CardContent>
              <p>
                Transform your campus into a digital hub with Gantries,
                leveraging ONDC and eSamudaay's tech stack.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Testimonial Section */}
        {/* <section className="bg-primary py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Leveraging ONDC for Local Commerce
            </h2>
            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
              <Image
                src="/images/colab2.jpg" // Replace with actual image path
                alt="Seller"
                width={80}
                height={80}
                className="rounded-full mb-4"
              />
              <p className="text-gray-900 font-semibold">Seller</p>
              <p className="text-gray-700 mt-2">
                Describe how eSamudaay utilizes ONDC open protocols along with
                its open-source technology to localize and democratize digital
                commerce (Gantries by eSamudaay - ...).
              </p>
              <p className="text-gray-500 mt-2 text-sm">May 8, 2020</p>
            </div>
          </div>
        </section> */}
      </div>

      <div className="bg-white py-16">
        {/* WHY Gantries Section */}
        <section className="container mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 text-left mb-8">
            Why <span className="text-primary">Gantries?</span>
          </h2>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <ul className="space-y-4">
                <li className="text-gray-700">
                  <span className="text-primary">•</span> Emphasize the unique
                  opportunity to be part of a cutting-edge digital commerce
                  initiative that supports local businesses.
                </li>
                <li className="text-gray-700">
                  <span className="text-primary">•</span> Highlight how Gantries
                  allow students to launch and manage their own digital
                  businesses on campus, leveraging ONDC protocols and
                  eSamudaay's open-source technology.
                </li>
                <li className="text-gray-700">
                  <span className="text-primary">•</span> Use relatable language
                  and visuals that resonate with the college lifestyle.
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/images/colab1.jpg" // Replace with actual image path
                alt="Why Gantries"
                width={600}
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <Image
              src="/images/colab2.jpg" // Replace with actual image path
              alt="Community of Innovators"
              width={600}
              height={400}
              className="rounded-lg"
            />
          </div>
          <div className="md:w-1/2 text-left md:pl-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Join a Thriving Community of Innovators
            </h2>
            <p className="text-gray-700 mb-8">
              Promote the collaborative aspect of Gantries, where students can
              network with like-minded peers, share ideas, and collaborate on
              projects. Include testimonials or quotes from students who have
              benefited from being part of the Gantries community.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
