
// we can import images for the tools later if we want to use them.
import react from "./Tools_And_Api/react.png";
import reactboot from "./Tools_And_Api/react-bootstrap.png";
import postman from "./Tools_And_Api/postman.png";
import docker from "./Tools_And_Api/docker.png";
import aws from "./Tools_And_Api/aws.png";
import gitlab from "./Tools_And_Api/gitlab.png";
import namecheap from "./Tools_And_Api/namecheap.jpeg";
import discord from "./Tools_And_Api/discord.png";



const toolInfo = [
    {
        name: "React",
        image: react,
		description: "JavaScript library used for front-end development",
        link: "https://reactjs.org/",
    },
    {
        name: "React Bootstrap",
        image: reactboot,
		description: "Framework used for front-end UI development",
        link: "https://react-bootstrap.github.io/",
    },
    {
        name: "Postman",
        image: postman,
		description: "Platform for building and using APIs",
        link: "https://documenter.getpostman.com/view/23628441/2s83tJGqha",
    },
    {
		name: "Docker",
        image: docker,
		description: "Containerization tool for runtime environments",
		link: "https://docker.com/",
	},
    {
        name: "Amazon Web Services (AWS)",
        image: aws,
		description: "Cloud hosting platform",
        link: "https://aws.amazon.com/",
    },
    {
        name: "GitLab",
        image: gitlab,
		description: "Version control, Git repository and CI/CD platform",
        link: "https://gitlab.com/vjawarani/cs373-idb",
    },
    {
        name: "NameCheap",
        image: namecheap,
		description: "Domain name registrar",
        link: "https://namecheap.com/",
    },
    {
        name: "Discord",
        image: discord,
		description: "Team communication platform",
        link: "https://discord.com/",
    },
]

export default toolInfo;
