const jobs = [
  {
    id: "programs-manager",
    title: "Programs Manager",
    synopsis:
      "We are looking for an experienced Programs Manager to organize and coordinate all our programs.",
    location: "Lagos, Nigeria",
    description: `
            We are looking for an experienced Programs Manager to organize and coordinate all
            our programs. You will provide strategic guidance to teams in ways that promote the
            Tech4Dev’s culture, mission, vision and objectives. You will also oversee the progress of
            operations of all programs.
            The ideal candidate will be an excellent leader and will have experience in managing
            team members to produce results in a timely manner. They will also be able to develop
            efficient strategies and tactics.
            The goal is to ensure that all programs deliver the desirable outcome to our organization.
        `,
    responsibilities: [
      "Plans, develops, implements, and coordinates all programs across the organization",
      "Provides on-site leadership for Programs Team by building and motivating team members to meet program goals, adhering to their responsibilities and deliverables",
      "Participates in establishing practices, policies, tools and partnerships to expand and mature these capabilities for the organization",
      "Manages all aspects of all programs to ensure the overall program is aligned to and directly supports the achievement of strategic objectives",
      "Monitors team’s performance and completes performance reviews",
      "Provides and communicate status report regarding all programs, deliverables, dependencies, risks and issues to the leadership team",
      "Understands interdependencies between technology and the organization’s objectives",
      "Directs, develops, implements and disseminates strategies and objectives to ensure achievement Tech4Dev’s objectives as prescribed by the Leadership Team",
      "Designs and implements systems to assess, collect, maintain, and analyze data; provides progress reports and evaluates, final reports and other information related to programs",
      "Develops and manages all aspects of programs engagement from planning, external vendor relationships, communications, resources, budget, change, risks and issues",
      "Sets and continually manages program’s expectations while delegating and managing deliverables with team members, facilitators and beneficiaries",
      "Monitors, tracks and controls outcomes to resolve issues, conflicts, dependencies and critical path deliverables",
      "Establishes and implements short- and long-term goals, objectives, policies, and operating procedures; monitors and evaluates operational effectiveness and effects changes required for improvement",
      "Directs, manages, and oversees the daily administrative components of all programs",
      "Plans and develops strategies for fund raising for all programs; prepare and review grant proposals",
    ],
    requirements: [
      "Minimum of 3+ years proven experience as a Program Manager in a not-for profit organization",
      "In-depth understanding of program management techniques and methods",
      "Strong experience presenting and demonstrated communication skills; both written and oral",
      "Intermediate level of proficiency with MS Word, MS Project, Excel, PowerPoint and SharePoint with experience presenting to stakeholders and Senior Leadership",
      "Project Management Professional (PMP) / PRINCE II certification is an added advantage",
    ],
    skills: [
      "Strong knowledge of digital and deep technology trends",
      "Proven knowledge and skills in technology focal areas such as software development, IOT, Data Engineering, Artificial Intelligence etc.",
      "Strong ability to gather, design, analyze, interpret data, compile information, and prepare reports",
      "Excellent leadership and communication (written, verbal and presentation) skills",
      "Proven ability to work creatively and analytically in a problem-solving environment demonstrating teamwork, innovation and excellence",
      "Program planning and implementation skills",
      "Strong grants writing skills",
      "Strong partnership building and interpersonal skills",
    ],
  },
  {
    id: "partnership-sustainability-associate",
    title: "Partnerships and Sustainability Associate",
    synopsis:
      "We are looking for an experienced Partnerships and Sustainability Associate.",
    location: "Lagos, Nigeria",
    description: `
           
        `,
    responsibilities: [
      `Develop partner networks and strategic partnerships`,
      `Develop a partnership strategy to increase the reach and impact of Tech4Dev’s mission`,
      `Expand and diversify the organization's donor base/pipeline and work closely with other team members to secure funding for new initiatives`,
      `Review guidelines for all proposals and reports to make sure all submissions are accurately formatted and include all required information, including budgets and materials`,
      `Write grant Proposals, with key input from Programs Leads`,
      `Coordinate the management of ongoing relationships with existing partners and where relevant, leverage those relationships to greater collective impact`,
      `Perform relevant research to identify available grant opportunities and evaluate the results`,
      `Cultivate and enrich relationships with partners`,
      `Oversee and organize events that include, but are not limited to, partner socials, the annual meeting, and all partnership events.`,
      `Create and diversify the funding base/pipeline`,
      `Develop and manage reporting and financial tracking of strategic partnership activities`,
      `Develop and manage information collection networks`,
    ],
    requirements: [
      `Minimum two years’ previous work experience in a nonprofit organization`,
      `BA/BSC required`,
    ],
    skills: [
      `Excellent written and oral communication skills`,
      `Excellent attention to detail and strong organization skills`,
      `A multi-tasker with strong ability to work under pressure`,
      `Can take the initiative, work independently, and as part of a team`,
      `Flexible, adaptive work style with a collaborative and proactive approach`,
    ],
  },
];

const jobsListDiv = document.querySelector(".jobs-list");
const jobsDiv = document.querySelector(".jobs");
const jobsPreviewDiv = document.querySelector(".job-preview-section");

let currentRole = null;

const onJobClick = (id) => {
  jobsListDiv.classList.add("hide");
  jobsPreviewDiv.classList.remove("hide");
  jobsPreviewDiv.querySelector(`#${id}`).classList.add("is-active");
  currentRole = jobs.find(({ id: jobId }) => jobId === id).title;
};

document
  .querySelector(".job-preview__back-link")
  .addEventListener("click", (_) => {
    jobsListDiv.classList.remove("hide");
    jobsPreviewDiv.classList.add("hide");
    document
      .querySelector(".job-preview.is-active")
      .classList.remove("is-active");
  });

const generateJob = ({ location, title, synopsis, id }) => {
  const job = document.createElement("div");
  job.classList.add("job");

  const jobText = document.createElement("div");
  jobText.classList.add("job__text");

  jobText.innerHTML = `
        <p class="job__location">
            ${location}
        </p>
        <p class="job__title">
            ${title}
        </p>
        <p class="job__description">
            ${synopsis}
        </p>
    `;

  job.appendChild(jobText);

  const jobButton = document.createElement("button");
  jobButton.classList.add("job__link");

  jobButton.innerText = "Apply";

  jobButton.addEventListener("click", (_) => onJobClick(id));

  job.appendChild(jobText);
  job.appendChild(jobButton);

  return job;
};

const getSection = ({ header, items }) => {
  const itemsHTML = items.reduce((currentHtml, currentItem) => {
    currentHtml += `
            <p class="job-preview__section-item">
                ${currentItem}
            </p>
        `;

    return currentHtml;
  }, "");

  return `
        <div class="job-preview__section">
            <h3 class="job-preview__section-header">
                ${header}
            </h3>
            <div class="job-preview__section-items">
                ${itemsHTML}
            </div>
        </div>
    `;
};

const generateJobPreview = ({
  id,
  title,
  description,
  location,
  responsibilities,
  requirements,
  skills,
}) => {
  const jobPreview = document.createElement("div");
  jobPreview.classList.add("job-preview");
  jobPreview.id = id;

  jobPreview.innerHTML = `
        <h3 class="job-preview__header">
            ${title}
        </h3>
        <h5 class="job-preview__location">
            ${location}
        </h5>
        <p class="job-preview__description">
            ${description}
        </p>
        ${getSection({
          header: "Why we’re looking for you",
          items: responsibilities,
        })}
        ${getSection({ header: "What you should have", items: skills })}
        ${getSection({ header: "What is required from you", items: skills })}
    `;

  return jobPreview;
};

window.addEventListener("DOMContentLoaded", (_) => {
  jobs.forEach((job) => {
    jobsDiv.appendChild(generateJob(job));
    jobsPreviewDiv
      .querySelector(".job-previews")
      .appendChild(generateJobPreview(job));
  });
});

[...document.querySelectorAll(".form__section")].forEach((section) => {
  const label = section.querySelector("label");
  const input = section.querySelector("input");

  input.addEventListener("focus", (_) => label.classList.add("is-focused"));

  const toggleLabel = (_) => {
    input.value.trim()
      ? label.classList.add("is-focused")
      : label.classList.remove("is-focused");
  };

  input.addEventListener("input", toggleLabel);

  input.addEventListener("blur", toggleLabel);
});

const resumeInput = document.querySelector(".resume__input");
const resumeFileWrapper = document.querySelector(".resume__file-wrapper");
const resumeReset = document.querySelector(".resume__file-reset");

let resumeFile = null;

resumeInput.addEventListener("change", (e) => {
  // const file = [...resumeInput.files].pop();
  const file = e.target.files[0];
  const fileShower = resumeFileWrapper.querySelector(".resume__file");
  fileShower.innerHTML = file.name;
  resumeFile = file;
  resumeFileWrapper.classList.add("is-showing");
});

resumeReset.addEventListener("click", (_) => {
  resumeFile = null;
  resumeFileWrapper.classList.remove("is-showing");
});

const form = document.querySelector("form");

const submitButton = document.querySelector(".form__submit-btn");

submitButton.addEventListener("click", async (_) => {
  const inputs = [
    ...form.querySelectorAll("input"),
    form.querySelector("textarea"),
  ];
  if (inputs.some(({ value }) => !value.trim()) || !resumeFile) {
    window.setStatus("error", true, "Kindly fill all the inputs.");
    return null;
  }
  const formData = new FormData();
  inputs.forEach(({ value, name }) => {
    console.log(name, value)
    formData.append(name, value);
  });

  formData.append("cvFiles", resumeFile);
  formData.append("role", currentRole);

  submitButton.classList.add("is-loading");
  submitButton.disabled = true;

  try {
    // const url = "https://formello.herokuapp.com/submit/5e6657f82056fd0017817f65"
    const url = "http://localhost:3000/apiv1/talent/apply"
    // const url =  "https://tech4dev.azurewebsites.net/apiv1/talent/apply"

    // await axios.post(
    //   url,
    //   formData,
    //   {
    //     headers: {
    //       "Access-Control-Allow-Origin": "*",
    //       "Access-Control-Allow-Methods":"GET,PUT,POST,DELETE,PATCH,OPTIONS",
    //       "Content-Type": "multipart/form-data"
    //     }
    //   }
    // );
    console.log(formData);

    let response = await fetch(url, {
      method: 'POST',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data"
      }
    });
    console.log(response);
    window.setStatus("success");

    inputs.forEach((input) => (input.value = ""));
    resumeReset.click();
    [...document.querySelectorAll(".is-focused")].forEach((label) =>
      label.classList.remove("is-focused")
    );
  } catch (err) {
    window.setStatus("error");
  } finally {
    submitButton.classList.remove("is-loading");
    submitButton.disabled = false;
  }
});
