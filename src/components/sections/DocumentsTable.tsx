/**
 * DocumentsTable — Required documents & requirements table.
 *
 * Renders a responsive table with document names, descriptions, and mandatory
 * status. Designed for AI extraction — HTML tables are parsed beautifully
 * by AI answer engines.
 *
 * @usage
 * ```tsx
 * <DocumentsTable
 *   documents={approval.documents}
 *   disclaimer="Requirements may vary. Confirm with DM."
 * />
 * ```
 *
 * @see .roo/rules/03-SEO-AI-SEARCH-MASTER.md — Section 5: Documents & requirements
 */

import { AlertCircle, CheckCircle } from "lucide-react";

interface DocumentItem {
  document: string;
  description?: string;
  mandatory?: boolean;
}

interface DocumentsTableProps {
  documents: DocumentItem[];
  /** Optional disclaimer text shown below the table */
  disclaimer?: string;
  className?: string;
}

export default function DocumentsTable({
  documents,
  disclaimer,
  className = "",
}: DocumentsTableProps) {
  if (!documents || documents.length === 0) return null;

  return (
    <section className={`bg-white ${className}`.trim()}>
      <div className="max-w-6xl mx-auto px-4 py-12 md:px-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-h2 font-montserrat text-heading-text mb-3">
            Documents & Requirements
          </h2>
          <p className="text-body-lg text-body-text mb-8 max-w-3xl">
            Ensure you have the following documents ready before submitting your
            application. Missing documents are the #1 cause of delays.
          </p>

          <div className="overflow-x-auto rounded-md border border-border-light">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-card-bg border-b border-border-light">
                  <th scope="col" className="px-4 py-3 text-caption font-bold text-heading-text uppercase tracking-wide">
                    Document
                  </th>
                  <th scope="col" className="px-4 py-3 text-caption font-bold text-heading-text uppercase tracking-wide hidden sm:table-cell">
                    Description
                  </th>
                  <th scope="col" className="px-4 py-3 text-caption font-bold text-heading-text uppercase tracking-wide w-28">
                    Required
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light">
                {documents.map((doc, index) => (
                  <tr
                    key={index}
                    className="hover:bg-light-bg/50 transition-colors duration-150"
                  >
                    <td className="px-4 py-3 text-body-sm font-medium text-body-text">
                      {doc.document}
                    </td>
                    <td className="px-4 py-3 text-body-sm text-body-text/70 hidden sm:table-cell">
                      {doc.description || "—"}
                    </td>
                    <td className="px-4 py-3">
                      {doc.mandatory !== false ? (
                        <span className="inline-flex items-center gap-1 text-caption font-medium text-body-text">
                          <CheckCircle size={14} strokeWidth={1.75} />
                          Mandatory
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-caption font-medium text-body-text/80">
                          <AlertCircle size={14} strokeWidth={1.75} />
                          Optional
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {disclaimer && (
            <p className="mt-4 text-caption text-body-text/80 flex items-start gap-1.5">
              <AlertCircle size={14} strokeWidth={1.75} className="shrink-0 mt-0.5" />
              {disclaimer}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
