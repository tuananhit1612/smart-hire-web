import { useState } from 'react';
import { CVData, DEFAULT_CV_DATA } from '../types/types';

// Helper to wait
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function useCVAutoFill(setCvData: React.Dispatch<React.SetStateAction<CVData>>) {
    const [isFilling, setIsFilling] = useState(false);

    const fillData = async (targetData: CVData) => {
        if (isFilling) return;
        setIsFilling(true);

        // 1. Reset to empty
        // We need a deep copy of empty data to ensuring we don't mutate the constant
        let currentData = JSON.parse(JSON.stringify(DEFAULT_CV_DATA)) as CVData;
        setCvData(currentData);
        await delay(300);

        // Helper to update local state and commit to React state
        const update = (newData: CVData) => {
            currentData = newData; // Update local ref
            setCvData({ ...newData }); // Trigger re-render
        };

        try {
            // 2. Personal Info: Name & Title (Fast Typing)
            const name = targetData.personalInfo.fullName || "";
            const title = targetData.personalInfo.title || "";

            // Update Name & Title almost instantly
            currentData.personalInfo.fullName = name;
            currentData.personalInfo.title = title;
            update(currentData);
            await delay(100);

            // 3. Contact Info (Fast Reveal)
            currentData.personalInfo.email = targetData.personalInfo.email;
            currentData.personalInfo.phone = targetData.personalInfo.phone;
            currentData.personalInfo.socials = targetData.personalInfo.socials;
            update(currentData);
            await delay(100);

            // 4. Summary (Optimized Streaming)
            const summaryContent = targetData.summary || "";
            const summaryWords = summaryContent.split(' ');
            currentData.summary = "";

            // Stream words in batches to prevent UI stutter (React Render Thrashing)
            for (let i = 0; i < summaryWords.length; i++) {
                currentData.summary += (i > 0 ? " " : "") + summaryWords[i];

                // Update state every 5 words instead of every 2, and barely wait
                if (i % 5 === 0 || i === summaryWords.length - 1) {
                    update(currentData);
                    await delay(5); // Ultra fast, just enough to see "movement"
                }
            }
            // Final consistency check
            currentData.summary = summaryContent;
            update(currentData);
            await delay(100);

            // 5. Sections (Sequential Reveal - Faster)

            // Experience
            if (targetData.experience) {
                for (const exp of targetData.experience) {
                    currentData.experience.push(exp);
                    update(currentData);
                    await delay(50); // Faster section reveal
                }
            }

            // Education
            if (targetData.education) {
                for (const edu of targetData.education) {
                    currentData.education.push(edu);
                    update(currentData);
                    await delay(50);
                }
            }

            // Projects
            if (targetData.projects) {
                for (const proj of targetData.projects) {
                    currentData.projects.push(proj);
                    update(currentData);
                    await delay(50);
                }
            }

            // Skills
            if (targetData.skills) {
                currentData.skills = targetData.skills;
                update(currentData);
            }

        } catch (error) {
            console.error("Auto-fill error:", error);
            // Fallback: just load everything instantly if error
            setCvData(targetData);
        } finally {
            setIsFilling(false);
        }
    };

    return { fillData, isFilling };
}
