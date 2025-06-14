// src/components/JobCard.jsx
import { MapPin } from 'lucide-react';

function JobCard({ job }) {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition">
      <div className="card-body">
        <h2 className="card-title text-primary">{job.title}</h2>
        <p className="text-sm text-gray-500">{job.company}</p>
        <p className="text-sm flex items-center gap-1">
          <MapPin className="w-4 h-4" /> {job.location}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {job.remote && <span className="badge badge-success">🌐 Remote</span>}
          {job.visa && <span className="badge badge-info">🛂 Visa Sponsored</span>}
        </div>
        <div className="card-actions justify-end mt-4">
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
          >
            View Job →
          </a>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
