import type { Metadata } from "next";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "QuickTools Desktop Privacy Policy",
  description:
    "Privacy Policy for QuickTools Desktop — a Windows desktop utility application. All processing is 100% local with zero tracking, telemetry, or server uploads.",
  alternates: {
    canonical: "https://yunus-emre-atmaz.vercel.app/privacy",
  },
  openGraph: {
    title: "QuickTools Desktop Privacy Policy",
    description:
      "Privacy Policy for QuickTools Desktop — Windows desktop utility application.",
    url: "https://yunus-emre-atmaz.vercel.app/privacy",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-ink text-fg">
      {/* Header / Nav */}
      <header className="sticky top-0 z-40 border-b border-line/60 bg-ink/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="group flex items-center gap-2 font-mono text-sm text-muted transition hover:text-fg"
          >
            <span
              className="inline-block transition-transform duration-200 group-hover:-translate-x-0.5"
              aria-hidden="true"
            >
              ←
            </span>
            <span>Portfolio</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="rounded-full border border-tech/30 bg-tech/5 px-2.5 py-0.5 font-mono text-xs text-tech">
              QuickTools Desktop
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-12 sm:py-16">
        <article className="mx-auto max-w-4xl">
          {/* Title Header */}
          <div className="border-b border-line pb-8">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
              <span>Windows Desktop Application</span>
              <span>•</span>
              <span className="text-tech">Microsoft Store Policy</span>
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
              QuickTools Desktop Privacy Policy
            </h1>
            <p className="mt-2 font-mono text-xs text-muted">
              Last updated: August 2026
            </p>
          </div>

          {/* Quick Summary Cards */}
          <section className="mt-8 grid gap-4 sm:grid-cols-2" aria-label="Privacy Highlights">
            <div className="rounded-xl border border-line bg-surface p-5">
              <div className="font-mono text-xs text-tech uppercase tracking-wider">
                100% Local Execution
              </div>
              <h2 className="mt-1.5 text-base font-medium text-fg">
                No Cloud or Server Uploads
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                All file operations, conversions, and metadata inspections are
                processed entirely on your device. Your files never leave your computer.
              </p>
            </div>

            <div className="rounded-xl border border-line bg-surface p-5">
              <div className="font-mono text-xs text-tech uppercase tracking-wider">
                Zero Telemetry
              </div>
              <h2 className="mt-1.5 text-base font-medium text-fg">
                No Trackers or Analytics
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                We do not collect personal information, usage metrics, crash
                telemetry, or advertising identifiers.
              </p>
            </div>

            <div className="rounded-xl border border-line bg-surface p-5">
              <div className="font-mono text-xs text-tech uppercase tracking-wider">
                Account-Free
              </div>
              <h2 className="mt-1.5 text-base font-medium text-fg">
                No Sign-Up or Login
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                QuickTools Desktop does not require an account or registration.
                You can use all features immediately and offline.
              </p>
            </div>

            <div className="rounded-xl border border-line bg-surface p-5">
              <div className="font-mono text-xs text-tech uppercase tracking-wider">
                User-Initiated
              </div>
              <h2 className="mt-1.5 text-base font-medium text-fg">
                Explicit Actions Only
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Files are only read, converted, or saved when you explicitly trigger
                an action in the user interface.
              </p>
            </div>
          </section>

          {/* Detailed Policy Sections */}
          <div className="mt-12 space-y-10 text-sm leading-relaxed text-muted">
            {/* 1. About the Application */}
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-fg">
                1. About QuickTools Desktop
              </h2>
              <p>
                QuickTools Desktop is a Windows desktop utility application
                designed to provide fast, local file processing and productivity
                tools. This Privacy Policy describes how QuickTools Desktop
                handles data when you use the software on your Windows computer.
              </p>
              <p>
                The application does not require an account, login credentials,
                or registration to access any of its features.
              </p>
            </section>

            {/* 2. Local Data Processing & Server-Free Architecture */}
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-fg">
                2. Local-Only Processing &amp; No Server Uploads
              </h2>
              <p>
                QuickTools Desktop processes files locally on the user&apos;s
                device. All operations—including image processing, metadata
                inspection and removal, text processing, file renaming, and file
                conversions—are executed directly by your machine&apos;s local
                hardware.
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  Files are <strong className="text-fg">not uploaded</strong> to
                  our servers or any remote third-party servers.
                </li>
                <li>
                  We do not maintain a remote database of user files, processed
                  contents, or activity logs.
                </li>
                <li>
                  All file processing occurs in-memory or in designated local
                  directories on your device.
                </li>
              </ul>
            </section>

            {/* 3. Metadata Inspection & Cleaner */}
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-fg">
                3. Metadata Inspection &amp; Removal
              </h2>
              <p>
                The Metadata Cleaner tool in QuickTools Desktop may inspect file
                metadata—such as GPS location coordinates, camera information,
                timestamps, copyright details, and technical image
                properties—solely to provide the requested local functionality
                (e.g. displaying metadata to the user or stripping metadata from
                the target file).
              </p>
              <p>
                Such metadata is read locally on demand and is{" "}
                <strong className="text-fg">never transmitted to us</strong> or
                to any external server.
              </p>
            </section>

            {/* 4. File Modification & Output Generation */}
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-fg">
                4. File Creation &amp; Modifications
              </h2>
              <p>
                QuickTools Desktop respects your existing files. No user files
                are modified unless the user explicitly performs an operation
                that creates the processed output.
              </p>
              <p>
                As part of its core functionality, the application may create
                new output files locally on the user&apos;s device (for example,
                saving converted images, cleaned files, or renamed items in a
                user-specified folder). All output creation is directly initiated
                by user actions.
              </p>
            </section>

            {/* 5. System Permissions & Features */}
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-fg">
                5. System Features (Clipboard &amp; Notifications)
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-fg">Clipboard Access:</strong>{" "}
                  Clipboard access is used only when the user explicitly
                  performs copy or paste-related functionality within the app.
                  QuickTools Desktop does not monitor or log clipboard history.
                </li>
                <li>
                  <strong className="text-fg">Windows Notifications:</strong>{" "}
                  Windows completion notifications may be used when enabled by
                  the user to alert when a batch task or file operation has
                  finished.
                </li>
              </ul>
            </section>

            {/* 6. Operating System Level Processing */}
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-fg">
                6. Operating System Data (Microsoft Windows)
              </h2>
              <p>
                QuickTools Desktop runs on the Microsoft Windows platform.
                Windows itself may process certain system-level information,
                app installation metrics, or crash diagnostics according to
                Microsoft&apos;s own privacy policies and your Windows privacy
                settings. QuickTools Desktop does not operate independent
                tracking or telemetry layers.
              </p>
            </section>

            {/* 7. Personal Information & Tracking */}
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-fg">
                7. Personal Information &amp; Analytics
              </h2>
              <p>
                We do not collect, sell, rent, or share personal information.
                We do not use analytics services, advertising trackers, or
                telemetry SDKs within QuickTools Desktop.
              </p>
            </section>

            {/* 8. Contact Information */}
            <section className="space-y-3 rounded-xl border border-line bg-surface p-6">
              <h2 className="text-lg font-semibold text-fg">
                8. Contact Information
              </h2>
              <p>
                If you have any questions, feedback, or concerns regarding this
                Privacy Policy or QuickTools Desktop, you may contact the
                developer directly:
              </p>
              <div className="mt-3 font-mono text-xs space-y-1 text-fg">
                <p>
                  <span className="text-muted">Developer: </span>
                  Yunus Emre Atmaz (yemreee_ai)
                </p>
                <p>
                  <span className="text-muted">Email: </span>
                  <a
                    href="mailto:yunusemreatmaz@gmail.com"
                    className="text-tech hover:underline underline-offset-4"
                  >
                    yunusemreatmaz@gmail.com
                  </a>
                </p>
              </div>
            </section>
          </div>

          {/* Footer inside Policy container */}
          <div className="mt-12 border-t border-line pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-muted">
            <p>© 2026 QuickTools Desktop / yemreee_ai</p>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="transition hover:text-fg hover:underline underline-offset-4"
              >
                Portfolio
              </Link>
              <a
                href="mailto:yunusemreatmaz@gmail.com"
                className="transition hover:text-fg hover:underline underline-offset-4"
              >
                Contact Developer
              </a>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
