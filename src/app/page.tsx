// app/auth/page.tsx (Handles both static and dynamic rendering for the /auth route)
import HomePage from "@/auth/homepage";  // Import the HomePage component for dynamic rendering

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Static or layout content for /auth */}
      <section className="py-20 md:py-28 px-4">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Welcome to LazyDevAI</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Please log in or sign up to get started with your developer journey.
            </p>
          </div>

          {/* The auth-specific content goes here */}
          {/* For example, a Login or Signup form can go here */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            {/* Assuming you have a login or sign-up component */}
            <Button asChild size="lg" className="w-full neon-button group">
              <Link href="/auth/login">Log In</Link>
            </Button>

            <Button asChild size="lg" variant="outline" className="w-full">
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* HomePage content */}
      <HomePage /> {/* The dynamic homepage component */}
    </div>
  );
}
