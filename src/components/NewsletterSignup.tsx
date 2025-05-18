import { useState } from "react";

interface NewsletterSignupProps {
  className?: string;
}

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ className }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      // Replace with your backend endpoint for newsletter signup
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/newsletter/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setStatus("success");
        setMessage("Thank you for subscribing!");
        setEmail("");
      } else {
        const data = await response.json();
        setStatus("error");
        setMessage(data?.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Network error. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`w-full max-w-md mx-auto bg-background rounded-lg shadow-md p-6 flex flex-col gap-3 ${className || ""}`}>
      <label htmlFor="newsletter-email" className="text-sm font-medium text-foreground">
        Subscribe to our newsletter
      </label>
      <div className="flex gap-2 mt-1">
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
          className="flex-1 px-3 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm bg-muted"
          disabled={status === "loading"}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors text-sm font-semibold"
          disabled={status === "loading" || !email}
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </button>
      </div>
      {message && (
        <div
          className={`text-sm mt-1 ${status === "success" ? "text-green-600" : "text-red-600"}`}
        >
          {message}
        </div>
      )}
    </form>
  );
};

export default NewsletterSignup;
