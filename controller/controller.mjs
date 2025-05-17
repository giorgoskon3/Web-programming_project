export function showHome(req, res) {
    res.render('index', {
        title: 'Job Agency Application',
        appName: 'Job Agency Application',
        css: ['styles.css'],
        navLinks: [
            { href: '/', text: 'Home' },
            { href: '/job-seeker', text: 'Job Seeker' },
            { href: '/employer', text: 'Employer' },
            { href: '/communicate', text: 'Communicate' }
        ]
    });
}

export function showJobSeeker(req, res) {
    res.render('job_seeker', {
        title: 'Job Seeker',
        css: ['styles.css', 'job_seeker.css'],
        appName: 'Job Agency Application',
        navLinks: [
            { href: '/', text: 'Home' },
            { href: '/job-seeker', text: 'Job Seeker' },
            { href: '/employer', text: 'Employer' },
            { href: '/communicate', text: 'Communicate' }
        ],
        cards: [
            {
                title: 'My Profile',
                buttons: [
                    { label: 'Edit Profile', href: '/job-seeker/editProfile', id: 'editProfile' },
                    { label: 'Upload Resume', href: '/job-seeker/uploadResume', id: 'uploadResume' },
                    { label: 'Recommended Jobs', href: '/job-seeker/recommendedJobs', id: 'recommendedJobs' }
                ]
            },
            {
                title: 'Job Opportunities',
                buttons: [
                    { label: 'Job Search', href: '/jobSearch', id: 'jobSearch' },
                    { label: 'Saved Jobs', href: '/savedJobs', id: 'savedJobs' }
                ]
            }
        ]
    });
}


export function showEmployer(req, res) {
    res.render('employer', {
        title: 'Employer',
        css: ['styles.css', 'employer.css'],
        appName: 'Job Agency Application',
        navLinks: [
            { href: '/', text: 'Home' },
            { href: '/job-seeker', text: 'Job Seeker' },
            { href: '/employer', text: 'Employer' },
            { href: '/communicate', text: 'Communicate' }
        ],
        cards: [
            {
                title: 'My Job Management',
                buttons: [
                    { label: 'Post New Job', href: '/employer/postNewJob', id: 'postNewJob' },
                    { label: 'Post Management', href: '/employer/postManagement', id: 'postManagement' },
                ]
            },
            {
                title: 'Candidate Management',
                buttons: [
                    { label: 'CV Search', href: '/jobSearch', id: 'jobSearch' },
                    { label: 'Saved Candidates', href: '/savedJobs', id: 'savedJobs' }
                ]
            },
            {
                title: 'Interview Management',
                buttons: [
                    { label: 'Interview Management', href: '/jobSearch', id: 'jobSearch' }
                ]
            },
            {
                title: 'Company Profile',
                buttons: [
                    { label: 'Edit Company Profile', href: '/jobSearch', id: 'jobSearch' }                ]
            }
        ]
    });
}

export function showCommunicate(req, res) {
    res.render('communicate', {
        title: 'Communicate',
        css: ['styles.css', 'communicate.css'],
        appName: 'Job Agency Application',
        contactTitle: 'Contact Us',
        navLinks: [
            { href: '/', text: 'Home' },
            { href: '/job-seeker', text: 'Job Seeker' },
            { href: '/employer', text: 'Employer' },
            { href: '/communicate', text: 'Communicate' }
        ],
    });
}
