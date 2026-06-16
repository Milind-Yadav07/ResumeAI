import React from 'react';
import { Page, Text, View, Image, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/types';
import { styles } from './CorporateLayout.styles';

interface CorporateLayoutProps {
    data: ResumeData;
}

const CorporateLayout: React.FC<CorporateLayoutProps> = ({ data }) => {
    const { personalInfo = { name: '', email: '', phone: '', location: '', links: '', summary: '', photo: '' }, skills = [], experience = [], education = [], projects = [], achievements = [] } = data;

    return (
        <Page size="A4" style={styles.page}>
            {/* Background Images Layer */}
            <View
                fixed
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}
                render={({ pageNumber }) => (
                    <Image
                        src={pageNumber === 1 ? "/Resume Templates/corporateDesign.png" : "/Resume Templates/corporateDesign2.png"}
                        style={{ width: '100%', height: '100%' }}
                    />
                )}
            />

            {/* Header section */}
            {(personalInfo.name || personalInfo.photo || personalInfo.email) && (
                <View style={styles.header}>
                    {personalInfo.photo && (
                        <View style={styles.photoContainer}>
                            <Image style={styles.photo} src={personalInfo.photo} />
                        </View>
                    )}
                    <View style={styles.headerRight}>
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
                </View>
            )}

            {/* Content Sections */}
            {personalInfo.summary && (
                <View style={styles.section} wrap={false}>
                    <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
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
                    <Text style={styles.sectionTitle}>PROFESSIONAL EXPERIENCE</Text>
                    {experience.filter(exp => exp.role || exp.company).map((exp, i, arr) => (
                        <View key={exp.id || i} style={{ marginBottom: i === arr.length - 1 ? 0 : 16 }} wrap={false}>
                            <View style={styles.itemHeader}>
                                <Text style={styles.itemTitle}>{exp.role}</Text>
                                <Text style={styles.itemDuration}>{exp.duration}</Text>
                            </View>
                            <Text style={styles.itemSub}>{exp.company}</Text>
                            <Text style={styles.description}>{exp.description}</Text>
                        </View>
                    ))}
                </View>
            )}

            {projects && projects.length > 0 && projects.some(proj => proj.title) && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>PROJECTS</Text>
                    {projects.filter(proj => proj.title).map((proj, i, arr) => (
                        <View key={proj.id || i} style={{ marginBottom: i === arr.length - 1 ? 0 : 16 }} wrap={false}>
                            <View style={styles.itemHeader}>
                                <Text style={styles.itemTitle}>{proj.title}</Text>
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

            {education && education.length > 0 && education.some(edu => edu.degree || edu.school) && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>EDUCATION</Text>
                    {education.filter(edu => edu.degree || edu.school).map((edu, i, arr) => (
                        <View key={edu.id || i} style={{ marginBottom: i === arr.length - 1 ? 0 : 16 }} wrap={false}>
                            <View style={styles.itemHeader}>
                                <Text style={styles.itemTitle}>{edu.degree}</Text>
                                <Text style={styles.itemDuration}>{edu.year}</Text>
                            </View>
                            <Text style={styles.itemSub}>{edu.school}</Text>
                        </View>
                    ))}
                </View>
            )}

            {achievements && achievements.length > 0 && achievements.some(ach => ach.title) && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>AWARDS & ACHIEVEMENTS</Text>
                    {achievements.filter(ach => ach.title).map((ach, i, arr) => (
                        <View key={ach.id || i} style={{ marginBottom: i === arr.length - 1 ? 0 : 16 }} wrap={false}>
                            <Text style={[styles.itemTitle, { marginBottom: 4 }]}>{ach.title}</Text>
                            <Text style={styles.description}>{ach.description}</Text>
                        </View>
                    ))}
                </View>
            )}
        </Page>
    );
};

export default CorporateLayout;
