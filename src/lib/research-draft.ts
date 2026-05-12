export type ResearchDraftInput = {
  businessName: string;
  currentChannels: string;
  biggestChallenge: string;
  primaryGoal: string;
};

export function generateResearchDraft(input: ResearchDraftInput) {
  const opportunities = [
    `Clarify positioning for ${input.businessName}`,
    `Strengthen ${input.currentChannels} creative consistency`,
    `Tie content directly to ${input.primaryGoal}`
  ];

  return {
    overview: `${input.businessName} currently relies on ${input.currentChannels} and wants to ${input.primaryGoal}.`,
    brandObservations: `The business shows traction potential, but ${input.biggestChallenge} suggests a brand and creative systems gap.`,
    growthOpportunities: opportunities.join(". "),
    risksAndGaps: `If ${input.biggestChallenge} continues, conversion efficiency may stay weak.`,
    editableJson: {
      opportunities
    }
  };
}
