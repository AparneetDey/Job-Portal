const JobData = [
    {
        id: 1,
        title: "Senior Frontend Developer",
        company: "TechCorp Inc.",
        location: "San Francisco, CA",
        type: "Full-time",
        salary: "$120k - $150k",
        description: "We're looking for a passionate frontend developer to join our growing team and help build the next generation of web applications.",
        tags: ["React", "TypeScript", "CSS"],
        applied: false,
    },
    {
        id: 2,
        title: "UX/UI Designer",
        company: "DesignStudio",
        location: "New York, NY",
        type: "Full-time",
        salary: "$90k - $120k",
        description: "Join our creative team to design beautiful and intuitive user experiences for web and mobile applications.",
        tags: ["Figma", "Adobe XD", "Prototyping"],
        applied: false,
    },
    {
        id: 3,
        title: "Data Scientist",
        company: "DataTech Solutions",
        location: "Remote",
        type: "Full-time",
        salary: "$100k - $140k",
        description: "Work with large datasets to extract insights and build machine learning models that drive business decisions.",
        tags: ["Python", "Machine Learning", "SQL"],
        applied: false,
    }
]

const jobHeader = document.querySelector("#jobHeader");
const jobContainer = document.querySelector("#jobsContainer");
const addJobBtn = document.querySelector("#addJobBtn");
const jobForm = document.querySelector("#jobForm");
const formGrid = document.querySelector("#jobGrid")

const renderJobs = () => {
    jobHeader.innerHTML = `Featured Jobs (${JobData.length})`
    jobContainer.innerHTML = JobData.map((job, index) => `
        <div class="job-card">
            <h3 class="job-title">${job.title}</h3>
            <div class="company">${job.company}</div>
            <div class="job-meta">
                <span>📍 ${job.location}</span>
                <span>💼 ${job.type}</span>
                <span>💰 ${job.salary}</span>
            </div>
            <p class="job-description">${job.description}</p>
            <div class="job-tags">
                ${job.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <button class="btn ${job.applied ? "applied" : "apply"}" onclick="applyJob(${index})">${job.applied ? "Applied" : "Apply Now"}</button>
            <button class="btn remove" onclick="removeJob(${index})">Remove</button>
            <button class="btn update" onclick="updateJob(${index})">Update</button>
        </div>
    `).join('');
}

const onAddJob = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const newJob = {
        id: JobData.length + 1,
        title: formData.get('title'),
        description: formData.get('description'),
        company: formData.get('company'),
        location: formData.get('location'),
        type: formData.get('type'),
        salary: formData.get('salary'),
        tags: formData.get('tag') ? formData.get('tag').split(',').map(tag => tag.trim()) : [],
        applied: false,
    };

    JobData.push(newJob);

    renderJobs();

    event.target.reset();

    jobForm.classList.remove("on-form-active");
}

const applyJob = (i) => {
    JobData[i].applied = !JobData[i].applied;
    renderJobs();
}

const removeJob = (i) => {
    if(!confirm("Do you want to remove this offer?")) return;

    JobData.splice(i, 1);
    renderJobs();
}

const updateJob = (i) => {
    const job = JobData[i];

    formGrid["title"].value = job.title;
    formGrid["description"].value = job.description;
    formGrid["company"].value = job.company;
    formGrid["location"].value = job.location;
    formGrid["type"].value = job.type;
    formGrid["salary"].value = job.salary;
    formGrid["tag"].value = job.tags ? job.tags.join(", ") : "";

    jobForm.classList.add("on-form-active");
    JobData.splice(i, 1);
    renderJobs();
}

renderJobs();


addJobBtn.addEventListener("click", () => {
    jobForm.classList.add("on-form-active")
})