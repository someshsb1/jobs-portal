// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';

function Home() {
    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [showRemoteOnly, setShowRemoteOnly] = useState(false);
    const [showVisaOnly, setShowVisaOnly] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            try {
                const [res1, res2, res3, res4] = await Promise.all([
                    fetch('http://localhost:3001/api/remoteok'),
                    fetch('https://jobicy.com/api/v2/remote-jobs'),
                    fetch('https://data.usajobs.gov/api/search?Keyword=visa', {
                        headers: {
                            'Host': 'data.usajobs.gov',
                            'User-Agent': 'someshbalani@icloud.com',
                            'Authorization-Key': 'tW3bQRe/a9Juncpk77JEyOkmH80SbRLVDKdRxOLEd/4='
                        }
                    }),
                    fetch('https://jooble.org/api/4ca9e3d6-9707-4dd8-aec7-3eed8463a28e', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            keywords: 'visa',
                            location: 'USA',
                            page: 1
                        })
                    })
                ]);

                const [data1, data2, data3, data4] = await Promise.all([
                    res1.json(),
                    res2.json(),
                    res3.json(),
                    res4.json()
                ]);

                const jobs1 = (data1.jobs || []).map(job => ({
                    source: 'RemoteOK',
                    id: job.id,
                    title: job.position || job.title,
                    company: job.company || job.employer,
                    location: job.location || job.city || 'Remote',
                    url: job.url || job.link,
                    remote: job.tags?.includes('remote') || job.is_remote,
                    visa: job.supports_visa || /visa/i.test(job.description)
                }));

                const jobs2 = (data2.jobs || []).map(job => ({
                    source: 'Jobicy',
                    id: job.id,
                    title: job.jobTitle,
                    company: job.companyName,
                    location: job.jobGeo || 'Remote',
                    url: job.url,
                    remote: job.jobGeo?.toLowerCase().includes('remote') || job.jobGeo === 'Anywhere',
                    visa: /visa/i.test(job.jobDescription)
                }));

                const jobs3 = (data3.SearchResult?.SearchResultItems || []).map(item => {
                    const j = item.MatchedObjectDescriptor;
                    return {
                        source: 'USAJOBS',
                        id: j.PositionID,
                        title: j.PositionTitle,
                        company: j.OrganizationName,
                        location: j.PositionLocationDisplay,
                        url: j.PositionURI,
                        remote: j.TeleworkEligible === 'Yes',
                        visa: j.JobCategory?.some(cat => /visa/i.test(cat.Name)) || false
                    };
                });

                const jobs4 = (data4.jobs || []).map(job => ({
                    source: 'Jooble',
                    id: job.id,
                    title: job.title,
                    company: job.company,
                    location: job.location || 'Remote',
                    url: job.link,
                    remote: /remote/i.test(job.location) || /remote/i.test(job.title),
                    visa: /visa/i.test(job.description)
                }));

                setJobs([...jobs1, ...jobs2, ...jobs3, ...jobs4]);
            } catch (err) {
                console.error('Error fetching jobs:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const filteredJobs = jobs
        .filter((job) =>
            (job.title?.toLowerCase() || '').includes(search.toLowerCase()) ||
            (job.company?.toLowerCase() || '').includes(search.toLowerCase())
        )
        .filter((job) => (showRemoteOnly ? job.remote : true))
        .filter((job) => (showVisaOnly ? job.visa : true));

    const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
    const paginatedJobs = filteredJobs.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="bg-base-200 min-h-screen text-base-content">
            {/* Navbar */}
            <div className="navbar bg-base-100 shadow-md">
                <div className="flex-1">
                    <h1 className="text-2xl font-bold">Job Portal</h1>
                </div>
                <div className="flex-none">
                    

                </div>
            </div>

            {/* Main content */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 px-4 py-6">
                {/* Sidebar */}
                <aside className="bg-base-100 p-4 rounded-box shadow space-y-4">
                    <input
                        type="text"
                        placeholder="Search jobs"
                        className="input input-bordered w-full"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">Remote Only</span>
                            <input type="checkbox" className="checkbox" checked={showRemoteOnly} onChange={() => setShowRemoteOnly(!showRemoteOnly)} />
                        </label>
                        <label className="label cursor-pointer">
                            <span className="label-text">Visa Sponsored Only</span>
                            <input type="checkbox" className="checkbox" checked={showVisaOnly} onChange={() => setShowVisaOnly(!showVisaOnly)} />
                        </label>
                    </div>
                </aside>

                {/* Job listings */}
                <section className="lg:col-span-3">
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-sm opacity-70">Showing {filteredJobs.length} jobs</p>
                        <div className="join">
                            <button
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="join-item btn btn-sm"
                            >
                                ← Prev
                            </button>
                            <button className="join-item btn btn-sm btn-disabled">
                                Page {currentPage} of {totalPages}
                            </button>
                            <button
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="join-item btn btn-sm"
                            >
                                Next →
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="space-y-4">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="skeleton h-24 w-full rounded-box"></div>
                            ))}
                        </div>
                    ) : (
                        ['RemoteOK', 'USAJOBS', 'Jobicy', 'Jooble'].map((source) => {
                            const jobsFromSource = paginatedJobs.filter(job => job.source === source);
                            if (jobsFromSource.length === 0) return null;
                            return (
                                <div key={source} className="mb-8">
                                    <h2 className="text-xl font-semibold mb-3">{source}</h2>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {jobsFromSource.map((job, index) => (
                                            <JobCard key={job.id || job.url || index} job={job} />
                                        ))}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </section>
            </div>

            {/* Footer */}
            <footer className="footer footer-center p-4 bg-base-100 text-base-content border-t">
                <p>
                    Built by <a href="https://someshbalani.com" className="link link-primary">Somesh Balani</a> · View on{' '}
                    <a href="https://github.com/someshsb1/jobs-portal" className="link link-primary">GitHub</a>
                </p>
            </footer>
        </div>
    );
}

export default Home;
