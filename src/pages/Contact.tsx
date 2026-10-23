import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AFFILIATE_LINKS } from "@/data/constants";
import { MessageCircle, Mail, Coffee, ArrowRight } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-12 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl md:text-5xl font-bold heading-font mb-4">
            Get In <span className="gold-text">Touch</span>
          </h1>
          <p className="text-muted-foreground">Payment required first for mentorship & signals access</p>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-6 pb-20">
        <div className="space-y-4">
          <a
            href={AFFILIATE_LINKS.whatsappMentorship}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card p-6 flex items-center gap-4 group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
              <MessageCircle className="w-6 h-6 text-green-400" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">WhatsApp — Mentorship & Signals</p>
              <p className="text-xs text-muted-foreground">Send proof of payment to gain access</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </a>

          <a
            href={AFFILIATE_LINKS.whatsappGeneral}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card p-6 flex items-center gap-4 group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
              <MessageCircle className="w-6 h-6 text-green-400" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">WhatsApp — General Inquiries</p>
              <p className="text-xs text-muted-foreground">Questions, partnerships & sponsorships</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </a>

          <a
            href="mailto:sylvesterowinoowino31@gmail.com"
            className="glass-card p-6 flex items-center gap-4 group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">Email Us</p>
              <p className="text-xs text-muted-foreground">For business inquiries & sponsorship</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </a>

          <a
            href={AFFILIATE_LINKS.kofi}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card p-6 flex items-center gap-4 group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Coffee className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">Support Us on Ko-fi</p>
              <p className="text-xs text-muted-foreground">Buy us a coffee ☕ and keep the education free</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
