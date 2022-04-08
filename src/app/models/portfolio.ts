import { Company } from "./company";
import { Education } from "./education";
import { Experience } from "./experience";
import { Project } from "./project";
import { School } from "./school";
import { Skill } from "./skill";

export interface Portfolio{
    id?: number,
    name: string,
    profilePhoto: string,
    image: string,
    position: string,
    ubication: string,
    about: string,
    email: string,
    facebook: string,
    linkedin: string,
    instagram: string,
    youtube: string,
    github: string,

    company: Experience,
    school: Education,
    experience: Experience[],
    education: Education[],
    skills: Skill[],
    projects: Project[]

}