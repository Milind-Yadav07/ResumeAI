import React from 'react';
import { Page, Text, View, Image, Link } from '@react-pdf/renderer';
import { ResumeData } from '@/types';
import { styles } from './CreativeLayout.styles';

interface CreativeLayoutProps {
    data: ResumeData;
}

const CreativeLayout: React.FC<CreativeLayoutProps> = ({ data }) => {
    const { personalInfo = { name: '', email: '', phone: '', location: '', links: '', summary: '', photo: '' }, skills = [], experience = [], education = [], projects = [], achievements = [] } = data;

    return (
        <Page size="A4" style={styles.page}>
            {/* Background Image Setup */}
            <Image
                src="/Resume Templates/creativeDesign.png"
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                fixed
            />

            <View style={styles.sidebar}>
                {personalInfo.name && <Text style={styles.name}>{personalInfo.name}</Text>}

                {(personalInfo.email || personalInfo.phone || personalInfo.location || personalInfo.links) && (
                    <View style={styles.sidebarSection}>
                        <Text style={styles.sidebarTitle}>PERSONAL INFO</Text>
                        {personalInfo.email && <Text style={styles.sidebarText}>{personalInfo.email}</Text>}
                        {personalInfo.phone && <Text style={styles.sidebarText}>{personalInfo.phone}</Text>}
                        {personalInfo.location && <Text style={styles.sidebarText}>{personalInfo.location}</Text>}
                        {personalInfo.links && (
                            <Link 
                                src={personalInfo.links.startsWith('http') ? personalInfo.links : `https://${personalInfo.links}`} 
                                style={styles.linksSmall}
                            >
                                {personalInfo.links}
                            </Link>
                        )}
                    </View>
                )}

                {skills && skills.length > 0 && skills.some(s => s && s.trim() !== '') && (
                    <View style={styles.sidebarSection}>
                        <Text style={styles.sidebarTitle}>SKILLS</Text>
                        {skills.filter(s => s && s.trim() !== '').map((skill, i) => (
                            <Text key={`skill-${i}`} style={styles.skillItem}>• {skill}</Text>
                        ))}
                    </View>
                )}

                {education && education.length > 0 && education.some(edu => edu.degree || edu.school) && (
                    <View style={styles.sidebarSection}>
                        <Text style={styles.sidebarTitle}>EDUCATION</Text>
                        {education.filter(edu => edu.degree || edu.school).map((edu, i, arr) => (
                            <View key={edu.id || i} style={{ marginBottom: i === arr.length - 1 ? 0 : 15 }}>
                                <View style={styles.itemHeader}>
                                    <Text style={[styles.itemBold, { fontSize: 10 }]}>{edu.degree}</Text>
                                    <Text style={[styles.itemDuration, { fontSize: 9 }]}>{edu.year}</Text>
                                </View>
                                <Text style={styles.sidebarSub}>{edu.school}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>

            <View style={styles.mainContent}>
                {personalInfo.summary && (
                    <View style={styles.mainSection}>
                        <Text style={styles.mainTitle}>ABOUT</Text>
                        <Text style={styles.description}>{personalInfo.summary}</Text>
                    </View>
                )}

                {experience && experience.length > 0 && (
                    <View style={styles.mainSection}>
                        <Text style={styles.mainTitle}>EXPERIENCE</Text>
                        {experience.map((exp, i, arr) => (
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

                {projects && projects.length > 0 && (
                    <View style={styles.mainSection}>
                        <Text style={styles.mainTitle}>PROJECTS</Text>
                        {projects.map((proj, i, arr) => (
                            <View key={proj.id || i} style={[styles.contentItem, i === arr.length - 1 ? { marginBottom: 0 } : {}]} wrap={false}>
                                <View style={styles.itemHeader}>
                                    <Text style={styles.itemBold}>{proj.title}</Text>
                                    {proj.link && (
                                        <Link 
                                            src={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} 
                                            style={styles.linksSmall}
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

                {achievements && achievements.length > 0 && (
                    <View style={styles.mainSection}>
                        <Text style={styles.mainTitle}>ACHIEVEMENTS</Text>
                        {achievements.map((ach, i, arr) => (
                            <View key={ach.id || i} style={[styles.contentItem, i === arr.length - 1 ? { marginBottom: 0 } : {}]} wrap={false}>
                                <Text style={styles.itemBold}>{ach.title}</Text>
                                <Text style={styles.description}>{ach.description}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </Page>
    );
};

export default CreativeLayout;
