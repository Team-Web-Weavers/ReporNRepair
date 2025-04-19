import { FiUsers, FiTarget, FiCode, FiHeart, FiGithub, FiLinkedin, FiInstagram} from "react-icons/fi";
import suhanidhar from "../assets/suhani.jpg";
import arnabdutta from "../assets/arnab.jpg";
import mdrizwanmolla from "../assets/rizwan.png";
import sanketdey from "../assets/sanket.jpg";
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section className="bg-sky-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About ReportNRepair
            </h1>
            <p className="text-xl opacity-90">
              Empowering communities through efficient civic issue reporting and
              resolution
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Our Mission
              </h2>
              <p className="text-gray-600 mb-4">
                At ReportNRepair, we believe in the power of collective action
                to drive meaningful change. Our platform empowers citizens to be
                the eyes and voice of their communities by seamlessly connecting
                them with local authorities. Whether it is a pothole, a broken
                streetlight, or a sanitation issue, ReportNRepair makes it easy
                to report, track, and resolve civic problems—fostering
                transparency, accountability, and a stronger sense of community.
              </p>
              <p className="text-gray-600">
                We're committed to fostering transparency, efficiency, and
                accountability in civic problem-solving, ultimately contributing
                to the development of smarter, more responsive communities.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1170&auto=format&fit=crop"
                alt="Team collaboration"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            What Sets Us Apart
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FiUsers />,
                title: "User-Friendly",
                description: "Intuitive interface designed for all age groups",
              },
              {
                icon: <FiTarget />,
                title: "Real-Time Tracking",
                description: "Monitor issue status and updates instantly",
              },
              {
                icon: <FiCode />,
                title: "AI-Powered",
                description: "Smart categorization and priority assessment",
              },
              {
                icon: <FiHeart />,
                title: "Community-Driven",
                description: "Built with and for the community",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-sky-600 text-3xl mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      {/* Team Section */}
<section className="py-16">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Meet Our Team</h2>
    <div className="flex flex-wrap justify-center gap-8">
      {[
        {
          name: "Suhani Dhar",
          role: "Team Lead",
          image: suhanidhar,
          social: {
            github: "https://github.com/suhanidhar25",
            linkedin: "https://www.linkedin.com/in/suhanidhar2504/"
            }
        },
        {
          name: "Arnab Dutta",
          role: "Backend Developer",
          image: arnabdutta,
          social: {
            github:"https://github.com/arnab0403",
            linkedin: "https://www.linkedin.com/in/arnab-dutta-933a142b6/"
            }
        },
        {
          name: "Md Rizwan Molla",
          role: "Frontend Developer",
          image: mdrizwanmolla,
          social: {
            github: "https://github.com/RizwanMolla",
            linkedin: "https://www.linkedin.com/in/rizwan-molla/"
            }
        },
        {
          name: "Sanket Dey",
          role: "Full Stack Developer",
          image: sanketdey,
          social: {
            github:"htps://github.com/sanket-hasher",
            linkedin: "https://www.linkedin.com/in/sanketdey2004/"
            }
        }
      ].map((member, index) => (
        <div 
          key={index} 
          className="w-64 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="h-64 overflow-hidden">
            <img 
              src={member.image} 
              alt={member.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://ui-avatars.com/api/?name=${member.name}&background=random`;
              }}
            />
          </div>
          <div className="p-4 text-center">
            <h3 className="text-xl font-semibold mb-1 text-gray-800">{member.name}</h3>
            <p className="text-sky-600">{member.role}</p>
            {/* Social Media Links */}
      <div className="flex justify-center space-x-4 mt-2">
        <a
          href={member.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          <FiGithub size={20} />
        </a>
        <a
          href={member.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-blue-600 transition-colors"
        >
          <FiLinkedin size={20} />
        </a>
        </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
      


        {/* Contact CTA */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Get In Touch
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Have questions or suggestions? We'd love to hear from you. Reach out
              to our team and let's make our communities better together.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-sky-600 text-white px-8 py-3 rounded-md hover:bg-sky-700 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </section>
    </div>
  );
};

export default AboutPage;
