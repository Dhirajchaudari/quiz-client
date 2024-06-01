import React from "react";
import Layout from "../components/Layout";

const Home: React.FC = () => {
  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen flex flex-col">
        <main className="container mx-auto px-6 py-8 flex-1">
          <h1 className="text-4xl font-bold text-center mb-4">
            Welcome to the Quiz App
          </h1>
          <p className="text-center text-gray-700">
            Start testing your knowledge with our amazing quizzes.
          </p>
        </main>
      </div>
    </Layout>
  );
};

export default Home;
