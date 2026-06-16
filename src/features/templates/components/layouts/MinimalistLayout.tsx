import React from 'react';
import { Page, Text, View, Image, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/types';
import { styles } from './MinimalistLayout.styles';

interface MinimalistLayoutProps {
    data: ResumeData;
}

const MinimalistLayout: React.FC<MinimalistLayoutProps> = ({ data }) => {
    const { personalInfo = { name: '', email: '', phone: '', location: '', links: '', summary: '', photo: '' }, skills = [], experience = [], education = [], projects = [], achievements = [] } = data;

    const renderDescription = (text: string) => {
        if (!text) return null;
        const lines = text.split('\n').filter(line => line.trim());
        if (lines.length <= 1) return <Text style={styles.description}>{text}</Text>;
        
        return (
            <View style={styles.bulletList}>
                {lines.map((line, i) => (
                    <View key={`bullet-${i}`} style={styles.bulletItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}>{line.replace(/^[•\-*]\s*/, '')}</Text>
                    </View>
                ))}
            </View>
        );
    };

    return (
        <Page size="A4" style={styles.page}>
            <Image
                src="/Resume Templates/minimalistDesign.png"
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                fixed
            />

            <View style={styles.sidebar}>
                {personalInfo.photo && (
                    <View style={styles.photoContainer}>
                        <Image style={styles.photo} src={personalInfo.photo} />
                    </View>
                )}
                {personalInfo.name && <Text style={styles.name}>{personalInfo.name}</Text>}

                {(personalInfo.email || personalInfo.phone || personalInfo.location || personalInfo.links) && (
                    <View style={styles.sidebarSection}>
                        <View style={{ position: 'relative', marginBottom: 12 }}>
                            <Text style={styles.sidebarTitle}>CONTACT</Text>
                            <View style={styles.sidebarTitleLine} />
                        </View>
                        {personalInfo.email && <Text style={styles.contactText}>{personalInfo.email}</Text>}
                        {personalInfo.phone && <Text style={styles.contactText}>{personalInfo.phone}</Text>}
                        {personalInfo.location && <Text style={styles.contactText}>{personalInfo.location}</Text>}
                        {personalInfo.links && (
                            <Link src={personalInfo.links.startsWith('http') ? personalInfo.links : `https://${personalInfo.links}`} style={[styles.contactText, { color: '#3b82f6', textDecoration: 'none', marginBottom: 0 }]}>
                                {personalInfo.links}
                            </Link>
                        )}
                    </View>
                )}

                {skills && skills.length > 0 && skills.some(s => s && s.trim()) && (
                    <View style={styles.sidebarSection}>
                        <View style={{ position: 'relative', marginBottom: 12 }}>
                            <Text style={styles.sidebarTitle}>SKILLS</Text>
                            <View style={styles.sidebarTitleLine} />
                        </View>
                        <View style={styles.skillContainer}>
                            {skills.filter(s => s && s.trim()).map((skill, i) => (
                                <Text key={`skill-${i}`} style={styles.skillTag}>{skill}</Text>
                            ))}
                        </View>
                    </View>
                )}

                {education && education.length > 0 && (
                    <View style={styles.sidebarSection}>
                        <View style={{ position: 'relative', marginBottom: 12 }}>
                            <Text style={styles.sidebarTitle}>EDUCATION</Text>
                            <View style={styles.sidebarTitleLine} />
                        </View>
                        {education.map((edu, i, arr) => (
                            <View key={edu.id || i} style={{ marginBottom: i === arr.length - 1 ? 0 : 15 }}>
                                <Text style={[styles.bold, { fontSize: 10, marginBottom: 5 }]}>{edu.degree}</Text>
                                <Text style={styles.educationYear}>{edu.year}</Text>
                                <Text style={[styles.subtitle, { color: '#64748b', fontSize: 9.5, marginBottom: 0 }]}>{edu.school}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>

            <View style={styles.mainContent}>
                {personalInfo.summary && (
                    <View style={styles.mainSection}>
                        <View style={{ position: 'relative', marginBottom: 12 }}>
                            <Text style={styles.mainTitle}>ABOUT</Text>
                            <View style={styles.mainTitleLine} />
                        </View>
                        <Text style={styles.summaryText}>{personalInfo.summary}</Text>
                    </View>
                )}

                {experience && experience.length > 0 && (
                    <View style={styles.mainSection}>
                        <View style={{ position: 'relative', marginBottom: 12 }}>
                            <Text style={styles.mainTitle}>EXPERIENCE</Text>
                            <View style={styles.mainTitleLine} />
                        </View>
                        {experience.map((exp, i) => (
                            <View key={exp.id || i} style={styles.contentItem} wrap={false}>
                                <View style={styles.itemHeader}>
                                    <Text style={styles.bold}>{exp.role}</Text>
                                    <Text style={styles.duration}>{exp.duration}</Text>
                                </View>
                                <Text style={styles.subtitle}>{exp.company}</Text>
                                {renderDescription(exp.description)}
                            </View>
                        ))}
                    </View>
                )}

                {projects && projects.length > 0 && (
                    <View style={styles.mainSection}>
                        <View style={{ position: 'relative', marginBottom: 12 }}>
                            <Text style={styles.mainTitle}>PROJECTS</Text>
                            <View style={styles.mainTitleLine} />
                        </View>
                        {projects.map((proj, i) => (
                            <View key={proj.id || i} style={styles.contentItem} wrap={false}>
                                <View style={[styles.itemHeader, { marginBottom: 6 }]}>
                                    <Text style={styles.bold}>{proj.title}</Text>
                                    {proj.link && (
                                        <Link src={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} style={{ fontSize: 9, color: '#3b82f6', textDecoration: 'none' }}>
                                            View Project
                                        </Link>
                                    )}
                                </View>
                                {renderDescription(proj.description)}
                            </View>
                        ))}
                    </View>
                )}

                {achievements && achievements.length > 0 && (
                    <View style={styles.mainSection}>
                        <View style={{ position: 'relative', marginBottom: 12 }}>
                            <Text style={styles.mainTitle}>ACHIEVEMENTS</Text>
                            <View style={styles.mainTitleLine} />
                        </View>
                        {achievements.map((ach, i) => (
                            <View key={ach.id || i} style={styles.contentItem} wrap={false}>
                                <View style={[styles.itemHeader, { marginBottom: 8 }]}>
                                    <Text style={styles.bold}>{ach.title}</Text>
                                </View>
                                {renderDescription(ach.description)}
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </Page>
    );
};

export default MinimalistLayout;
