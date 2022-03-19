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

    company: Company,
    school: School,
    experience: Experience[],
    education: Education[],
    skills: Skill[],
    projects: Project[]

}