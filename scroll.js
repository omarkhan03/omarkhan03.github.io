window.addEventListener("mouseup", (event) => {
      
    const id = event.path[0].id
    let section

    switch (id) {
      case "about_button":
        section = "ABOUT ME"
        break;
      case "projects_button":
        section = "PROJECTS"
        break;
      case "skills_button":
        section = "SKILLS"
        break;
      case "writing_button":
        section = "WRITING"
        break;
    }

    const element = document.getElementById(section)
    element.scrollIntoView({ behavior: "smooth" })
  })