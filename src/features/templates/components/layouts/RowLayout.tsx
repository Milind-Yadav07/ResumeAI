import React from 'react';
import { Page, Text, View, Image, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/types';
import { styles } from './RowLayout.styles';

interface RowLayoutProps {
    data: ResumeData;
}

const RowLayout: React.FC<RowLayoutProps> = ({ data }) => {
    const { personalInfo = { name: '', email: '', phone: '', location: '', links: '', summary: '', photo: '' }, skills = [], experience = [], education = [], projects = [], achievements = [] } = data;

    return (
        <Page size="A4" style={styles.page}>
            {/* Background Image Setup */}
            <Image
                src="/Resume Templates/simpleDesign.png"
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                fixed
            />

            <View style={styles.header}>
                {personalInfo.name && <Text style={styles.name}>{personalInfo.name}</Text>}
                <View style={styles.contactInfo}>
                    {personalInfo.email && <Text>{personalInfo.email}</Text>}
                    {personalInfo.phone && <Text>{personalInfo.phone}</Text>}
                    {personalInfo.location && <Text>{personalInfo.location}</Text>}
                    {personalInfo.links && (
                        <Link 
                            src={personalInfo.links.startsWith('http') ? personalInfo.links : `https://${personalInfo.links}`} 
                            style={styles.links}
                        >
                            {personalInfo.links}
                        </Link>
                    )}
                </View>
            </View>

            {personalInfo.summary && (
                <View style={styles.section} wrap={false}>
                    <Text style={styles.sectionTitle}>ABOUT</Text>
                    <Text style={styles.description}>{personalInfo.summary}</Text>
                </View>
            )}

            {skills && skills.length > 0 && skills.some(s => s && s.trim() !== '') && (
                <View style={styles.section} wrap={false}>
                    <Text style={styles.sectionTitle}>SKILLS</Text>
                    <View style={styles.skillsGrid}>
                        {skills.filter(s => s && s.trim() !== '').map((skill, i) => (
                            <Text key={`skill-${i}`} style={styles.skillTag}>{skill}</Text>
                        ))}
                    </View>
                </View>
            )}

            {experience && experience.length > 0 && experience.some(exp => exp.role || exp.company) && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>EXPERIENCE</Text>
                    {experience.filter(exp => exp.role || exp.company).map((exp, i, arr) => (
                        <View key={exp.id || i} style={[styles.contentItem, i === arr.length - 1 ? { marginBottom: 0 } : {}]} wrap={false}>
                            <View style={styles.itemHeader}>
                                <Text style={styles.itemBold}>{exp.role}</Text>
                                <Text style={styles.itemDuration}>{exp.duration}</Text>
                            </View>
                            <Text style={styles.itemSub}>{exp.company}</Text>
                            <Text style={styles.description}>{exp.description}</Text>
                        </View>
                    ))}
                </View>
            )}

            {education && education.length > 0 && education.some(edu => edu.degree || edu.school) && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>EDUCATION</Text>
                    {education.filter(edu => edu.degree || edu.school).map((edu, i, arr) => (
                        <View key={edu.id || i} style={[styles.contentItem, i === arr.length - 1 ? { marginBottom: 0 } : {}]} wrap={false}>
                            <View style={styles.itemHeader}>
                                <Text style={styles.itemBold}>{edu.degree}</Text>
                                <Text style={styles.itemDuration}>{edu.year}</Text>
                            </View>
                            <Text style={styles.itemSub}>{edu.school}</Text>
                        </View>
                    ))}
                </View>
            )}

            {projects && projects.length > 0 && projects.some(proj => proj.title) && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>PROJECTS</Text>
                    {projects.filter(proj => proj.title).map((proj, i, arr) => (
                        <View key={proj.id || i} style={[styles.contentItem, i === arr.length - 1 ? { marginBottom: 0 } : {}]} wrap={false}>
                            <View style={styles.itemHeader}>
                                <Text style={styles.itemBold}>{proj.title}</Text>
                                {proj.link && (
                                    <Link 
                                        src={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} 
                                        style={styles.projectLink}
                                    >
                                        View Project
                                    </Link>
                                )}
                            </View>
                            <Text style={styles.description}>{proj.description}</Text>
                        </View>
                    ))}
                </View>
            )}

            {achievements && achievements.length > 0 && achievements.some(ach => ach.title) && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>ACHIEVEMENTS</Text>
                    {achievements.filter(ach => ach.title).map((ach, i, arr) => (
                        <View key={ach.id || i} style={[styles.contentItem, i === arr.length - 1 ? { marginBottom: 0 } : {}]} wrap={false}>
                            <Text style={styles.itemBold}>{ach.title}</Text>
                            <Text style={styles.description}>{ach.description}</Text>
                        </View>
                    ))}
                </View>
            )}
        </Page>
    );
};

export default RowLayout;
