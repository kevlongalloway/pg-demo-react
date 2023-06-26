export default function AppHomePage() {
  return (
    <div className="relative min-h-screen">
    <h1 className="absolute top-10 left-1/2 transform -translate-x-1/2 z-10 text-customTextColor text-3xl font-bold text-center" style={{
      fontSize: "1.5rem",
      fontFamily: "",
      letterSpacing: "0.24rem"
        }}>
        Welcome to Pocket Guru!
      </h1>
      <div className="absolute inset-0 z-0">
        <svg
          width="100%"
          viewBox="0 0 415 502"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.035))' }}
        >
          <path
            d="M0.102295 -1V381.053C0.102295 381.053 32.3374 449.788 115.214 441.811C198.091 433.835 215.28 390.876 315.345 470.049C315.345 470.049 350.646 503.185 415.102 501.967V-1H0.102295Z"
            fill="#FAF8F5"
          />
        </svg>
      </div>
      <div className="flex justify-center">
        <img
          src="/Group.png"
          alt="Group"
          className="relative z-10 object-contain mt-36"
        />
      </div>
      <div className="mt-36 text-center">
        <h2 className="text-2xl font-bold mb-2 text-customTextColor">Mental Harmony</h2>
        <h3 className="text-lg text-gray-600">Your Pocket Guide to Mental Wellness</h3>
      </div>
      {/* Join Now Button */}
      <div className="absolute bottom-0 left-0 w-full py-8">
        <div className="flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 w-full mx-4 rounded-full">
          Join Now
        </button>
        </div>
        {/* Already have an account? */}
        <div className="mt-4 text-center">
          <p className="text-gray-500">
            Already have an account?{" "}
            <a href="#" className="underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
