const jobs = [
  {
    id: "programs-associate",
    title: "Programs Associate",
    synopsis:
      "We are looking for an experienced programs Associate",
    location: "Lagos, Nigeria",
    description: `
         
        `,
    responsibilities: [
      `Strategize and outline goals and objectives of the program`,
      `Assign team members and volunteers to the different initiatives`, 
      `Estimate and implement program budgets`, 
      `Set program controls/governance/standards`, 
      `Monitor all initiatives through the entire program cycle, while managing the day-today detailed aspects of multiple initiatives`,  
      `Coordinate and utilize resources for multiple projects in the program`, 
      `Communicate with individual initiative volunteers to address potential risks as well as resolve problems and issues`,
      `Manage program facilitators across all states`,

    ],
    requirements: [
      `Bachelors’ degree in a related field`,
      `Minimum of 1 year experience in Programs or a related field.`,
    ],
    skills: [
      `Programs or Project Management skills`,
      `Strong analytical skills`,
      `Critical thinking and problem-solving skills`,
      `Excellent time-management skills`,
      `Excellent interpersonal, presentation and communication skills`,
    ],
    status:"closed",
  },
  {
    id: "Placement-lead",
    title: "Placement Lead",
    synopsis:
      "We are looking for an experienced Placement Lead.",
    location: "Lagos, Nigeria",
    description: `
           
        `,
    responsibilities: [
     `Secure partnership internship placement for all beneficiaries on all programs`,
    `Facilitate the interviewing of beneficiaries to assist in completion of placement assistance request forms;`, 
    `Maintain files of beneficiaries; conduct pre-screening of beneficiaries to verify qualifications`,
    `Supervise the receiving of internship offers from employers; match beneficiaries to jobs and maintain records of alumni/beneficiaries placed in jobs`,
    `Analyze available job market economic data and information`,
    `Research job market trends and requirements for a variety of occupations`,
    `Coordinate contractual relationships with a variety of technology organizations`,
    ],
    requirements:[
      `Minimum of two years’ full-time experience in a Human Resource role.`,
      `Bachelor's degree in Human Resources or any other relevant field`,
    ],
    skills: [
      `Efficient time management and prioritization skills are essential `,
      `Work independently with little direction`,
      `Strong attention to details`,
      `Proven ability to negotiate Experience in Technology Industry is a plus`,
      `Excellent written and verbal communications skills, including networking skills with people at all levels internally and externally`,
      `Proven talent at building relationships and influencing without authority to produce results and outcomes.`,
      `Proficient in utilizing Microsoft Office Suite; and confident learning other programs and technology tools to execute in this role`,

    ],
    status:"closed",
  },
  {
    id: "Programs-intern",
    title: "Programs Intern",
    synopsis:
      "We are looking for a Programs Intern.",
    location: "Lagos, Nigeria",
    description: `
           
        `,
    responsibilities: [
      `Provide support to your direct report and program manager in implementing key program deliverables`,
      `Provide support for creation and review of key program documentation`,
      `Participate in program monitoring and evaluation to ensure end line deliverables are properly tracked`,
    ],
    requirements:[
      `Minimum 0f 6 months experience in Programs or Project management`,
      `Bachelors’ degree in a related field`,
    
    ],
    skills: [
      `Strong analytical skills`,
      `Critical thinking and problem-solving skills`,
      `Excellent time-management skills`,
      `Excellent interpersonal, presentation and communication skills`,
    ],
    status:"closed",
  },
];

const jobsListDiv = document.querySelector(".jobs-list");
const jobsDiv = document.querySelector(".jobs");
const jobsPreviewDiv = document.querySelector(".job-preview-section");

let currentRole = null;

const onJobClick = (id) => {
  if(jobs.find(({ id: jobId }) => jobId === id).status === "closed"){
    window.setStatus("error", true, "This offer has been closed");
  }else{
    jobsListDiv.classList.add("hide");
    jobsPreviewDiv.classList.remove("hide");
    jobsPreviewDiv.querySelector(`#${id}`).classList.add("is-active");
    currentRole = jobs.find(({ id: jobId }) => jobId === id).title;
  }
  
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
        ${getSection({ header: "requirements", items: requirements })}
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
  let formData = new FormData();
  inputs.forEach(({ value, name }) => {
    if(name !== "files"){
      formData.append(name, value);
      console.log(name, value)
    }
  });

  formData.append("files", resumeFile);
  formData.append("role", currentRole);

  submitButton.classList.add("is-loading");
  submitButton.disabled = true;

  try {
    // const url = "https://formello.herokuapp.com/submit/5e6657f82056fd0017817f65"
    // const url = "http://localhost:3000/apiv1/talent/apply"
    const url =  "https://tech4dev.azurewebsites.net/apiv1/talent/apply"

    await axios.post(
      url,
      formData,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods":"GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Content-Type": "multipart/form-data"
        }
      }
    );
    // console.log(formData.values);
    // const myHeaders = new Headers();
    // myHeaders.append('Content-Type', 'multipart/form-data');
    // myHeaders.append('Access-Control-Allow-Origin', '*');
    // // myHeaders.append('X-Custom-Header', 'ProcessThisImmediately');

    // let response = await fetch(url, {
    //   method: 'POST',
    //   body: formData,
    // });
    // console.log(response);
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


