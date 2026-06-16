import React from 'react';
import { Page, Text, View, Image, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/types';
import { styles } from './ShowcaseLayout.styles';

interface ShowcaseLayoutProps {
    data: ResumeData;
}

const ShowcaseLayout: React.FC<ShowcaseLayoutProps> = ({ data }) => {
    // Robust data destructuring with fallbacks
    const personalInfo = data?.personalInfo || { name: '', email: '', phone: '', location: '', links: '', summary: '', photo: '' };
    const skills = Array.isArray(data?.skills) ? data.skills : [];
    const experience = Array.isArray(data?.experience) ? data.experience : [];
    const education = Array.isArray(data?.education) ? data.education : [];
    const projects = Array.isArray(data?.projects) ? data.projects : [];
    const achievements = Array.isArray(data?.achievements) ? data.achievements : [];

    const renderText = (content: string) => {
        if (!content) return null;
        return <Text style={styles.description}>{content}</Text>;
    };

    return (
        <Page size="A4" style={styles.page}>
            {/* Background Image Setup */}
            <View
                fixed
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}
                render={({ pageNumber }) => (
                    <Image
                        src={pageNumber === 1 ? "/Resume Templates/showcaseDesign.png" : "/Resume Templates/simpleDesign.png"}
                        style={{ width: '100%', height: '100%' }}
                    />
                )}
            />

            <View style={styles.frameBorder}>
                <View style={styles.internalPadding}>
                    
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.name}>{personalInfo.name || 'YOUR NAME'}</Text>
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

                    {/* Summary */}
                    {personalInfo.summary && (
                        <View style={styles.section} wrap={false}>
                            <Text style={styles.sectionTitle}>Professional Summary</Text>
                            <View style={styles.sectionContent}>
                                {renderText(personalInfo.summary)}
                            </View>
                        </View>
                    )}

                    {/* Skills */}
                    {skills.length > 0 && (
                        <View style={styles.section} wrap={false}>
                            <Text style={styles.sectionTitle}>Skills</Text>
                            <View style={styles.skillsGrid}>
                                {skills.filter(s => s && String(s).trim()).map((skill, i) => (
                                    <Text key={`skill-${i}`} style={styles.skillTag}>{String(skill)}</Text>
                                ))}
                            </View>
                        </View>
                    )}

                    {/* Experience */}
                    {experience.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Experience</Text>
                            <View style={styles.sectionContent}>
                                {experience.map((exp, i) => (
                                    <View key={exp.id || i} style={i === experience.length - 1 ? { marginBottom: 0 } : styles.experienceItem} wrap={false}>
                                        <View style={styles.itemHeader}>
                                            <Text style={styles.itemTitle}>{exp.role || 'Position'}</Text>
                                            <Text style={styles.itemDuration}>{exp.duration || ''}</Text>
                                        </View>
                                        <Text style={styles.itemSub}>{exp.company || ''}</Text>
                                        {renderText(exp.description)}
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}

                    {/* Projects */}
                    {projects.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Projects</Text>
                            <View style={styles.sectionContent}>
                                {projects.map((proj, i) => (
                                    <View key={proj.id || i} style={i === projects.length - 1 ? { marginBottom: 0 } : styles.experienceItem} wrap={false}>
                                        <View style={styles.itemHeader}>
                                            <Text style={styles.itemTitle}>{proj.title || 'Project Name'}</Text>
                                            {proj.link && (
                                                <Link 
                                                    src={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} 
                                                    style={styles.projectLink}
                                                >
                                                    View Project
                                                </Link>
                                            )}
                                        </View>
                                        {renderText(proj.description)}
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}

                    {/* Education */}
                    {education.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Educational Background</Text>
                            <View style={styles.sectionContent}>
                                {education.map((edu, i) => (
                                    <View key={edu.id || i} style={i === education.length - 1 ? { marginBottom: 0 } : styles.experienceItem} wrap={false}>
                                        <View style={styles.itemHeader}>
                                            <Text style={styles.itemTitle}>{edu.degree || 'Degree'}</Text>
                                            <Text style={styles.itemDuration}>{edu.year || ''}</Text>
                                        </View>
                                        <Text style={styles.itemSub}>{edu.school || ''}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}

                    {/* Achievements */}
                    {achievements.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Notable Achievements</Text>
                            <View style={styles.sectionContent}>
                                {achievements.map((ach, i) => (
                                    <View key={ach.id || i} style={i === achievements.length - 1 ? { marginBottom: 0 } : styles.experienceItem} wrap={false}>
                                        <View style={styles.itemHeader}>
                                            <Text style={styles.itemTitle}>{ach.title || 'Achievement'}</Text>
                                        </View>
                                        {renderText(ach.description)}
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}
                </View>
            </View>
        </Page>
    );
};

export default ShowcaseLayout;
