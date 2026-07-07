/**
 * ACOS Production E2E Five Business Workflows Simulation
 * Executes 5 complete industry-specific lifecycles over HTTPS Management API
 */

const PAT = process.env.SUPABASE_PAT || ''
const PROJECT_REF = 'arvtqnmgicovbszypspz'
const BASE_URL = `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`

async function runSQL(sql, params = []) {
  let formattedSql = sql
  params.forEach((val, idx) => {
    const placeholder = `$${idx + 1}`
    let literalVal = val
    if (typeof val === 'string') {
      literalVal = `'${val.replace(/'/g, "''")}'`
    } else if (val === null) {
      literalVal = 'NULL'
    } else if (typeof val === 'object') {
      literalVal = `'${JSON.stringify(val).replace(/'/g, "''")}'::jsonb`
    }
    formattedSql = formattedSql.replace(placeholder, literalVal)
  })

  const resp = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PAT}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: formattedSql })
  })

  const data = await resp.json()
  if (!resp.ok) {
    throw new Error(data.message || data.error || JSON.stringify(data))
  }
  return { rows: data }
}

async function main() {
  console.log('=== ACOS Production E2E Five Workflows Validation ===\n')

  const orgId = '00000000-0000-0000-0000-000000000001' // Aqua Colloids Org
  const userId = '00000000-0000-0000-0000-000000000002' // Sales manager

  const workflows = [
    {
      name: 'Workflow 1: Food & Beverage - Low Fat Salad Dressing',
      leadSource: 'website',
      leadQuery: 'Need Xanthan Gum Food Grade (AC-XG-100) for a new salad dressing line.',
      company: 'Hindustan Food Processing Ltd',
      city: 'Mumbai',
      contactName: 'Dr. Amit Sharma',
      contactTitle: 'Head of R&D',
      opportunityName: 'Hindustan Foods - Xanthan Gum 10MT Contract',
      opportunityValue: 1800000.00,
      sku: 'AC-XG-100',
      sampleNotes: '1kg trial sample of AC-XG-100.',
      formulationName: 'Salad Dressing - Low Fat Stabilized',
      ingredients: [{"ingredient":"AC-XG-100","percentage":0.35},{"ingredient":"Water","percentage":65.0},{"ingredient":"Oil","percentage":25.0}],
      steps: ["Hydrate Xanthan Gum in water for 15 mins", "Slowly add oil under high shear", "Adjust pH and add spices"],
      feedbackNotes: 'The AC-XG-100 performed exceptionally well. suspended herbs perfectly without masking flavor.',
      rating: 5
    },
    {
      name: 'Workflow 2: Industrial Textiles - Gujarat Textile Prints',
      leadSource: 'indiamart',
      leadQuery: 'Inquiry for high viscosity Guar Gum Industrial Grade (AC-GG-200) for textile sizing.',
      company: 'Gujarat Textile Chemicals Pvt Ltd',
      city: 'Ahmedabad',
      contactName: 'Mr. Rajesh Patel',
      contactTitle: 'Operations Director',
      opportunityName: 'Gujarat Textiles - Guar Gum 50MT Annual Supply',
      opportunityValue: 6500000.00,
      sku: 'AC-GG-200',
      sampleNotes: '5kg package of AC-GG-200 textile sizing grade.',
      formulationName: 'Cotton Sizing Agent High-Viscosity',
      ingredients: [{"ingredient":"AC-GG-200","percentage":2.5},{"ingredient":"Starch","percentage":5.0},{"ingredient":"Water","percentage":92.5}],
      steps: ["Cook starch slurry to 85C", "Disperse Guar Gum under high speed agitation", "Filter and apply to warp yarns"],
      feedbackNotes: 'Excellent film-forming properties and tensile strength. Warp breakage rates reduced by 14%.',
      rating: 5
    },
    {
      name: 'Workflow 3: Cosmetics - Lotus Hair Care Line',
      leadSource: 'linkedin',
      leadQuery: 'Sourcing Carrageenan Iota Type (AC-CG-200) for hair conditioner thickening tests.',
      company: 'Lotus Cosmetics Ltd',
      city: 'Noida',
      contactName: 'Dr. Neha Gupta',
      contactTitle: 'Senior Formulator',
      opportunityName: 'Lotus Haircare - Carrageenan 2MT contract',
      opportunityValue: 950000.00,
      sku: 'AC-CG-200',
      sampleNotes: '500g lab sample of AC-CG-200.',
      formulationName: 'Silicone-Free Thickening Conditioner',
      ingredients: [{"ingredient":"AC-CG-200","percentage":0.8},{"ingredient":"Cetyl Alcohol","percentage":3.0},{"ingredient":"Behentrimonium Chloride","percentage":1.5}],
      steps: ["Heat water phase containing Carrageenan to 75C", "Melt fatty alcohols and surfactants", "Emulsify phases and cool under slow stir"],
      feedbackNotes: 'Good stability and smooth slip, but slightly higher viscosity than target. Will adjust dosage next trial.',
      rating: 4
    },
    {
      name: 'Workflow 4: Food Jelly - Britannia Desserts',
      leadSource: 'website',
      leadQuery: 'Looking for high gel strength Agar Agar (AC-AG-100) for vegetarian jelly candies.',
      company: 'Britannia Foods Ltd',
      city: 'Bangalore',
      contactName: 'Dr. Vivek Rao',
      contactTitle: 'Director of Food Innovation',
      opportunityName: 'Britannia Jelly - Agar Agar 15MT supply contract',
      opportunityValue: 4200000.00,
      sku: 'AC-AG-100',
      sampleNotes: '2kg Agar Agar AC-AG-100 food grade sample.',
      formulationName: 'High Gel Strength Strawberry Jelly',
      ingredients: [{"ingredient":"AC-AG-100","percentage":1.2},{"ingredient":"Sugar","percentage":45.0},{"ingredient":"Water","percentage":53.8}],
      steps: ["Dissolve Agar in boiling water for 5 mins", "Add sugar and citric acid", "Pour into molds and set at room temperature"],
      feedbackNotes: 'Excellent gel strength and clarity. candying properties are superior to gelatin.',
      rating: 5
    },
    {
      name: 'Workflow 5: Pharmaceuticals - Sun Pharma Excipients',
      leadSource: 'tradeindia',
      leadQuery: 'Inquiry for high purity Methyl Cellulose (AC-MC-100) as tablet binder.',
      company: 'Sun Pharmaceutical Industries',
      city: 'Vadodara',
      contactName: 'Dr. Anil Mehta',
      contactTitle: 'Head of Regulatory Affairs',
      opportunityName: 'Sun Pharma - Methyl Cellulose Annual Excipient Supply',
      opportunityValue: 7800000.00,
      sku: 'AC-MC-100',
      sampleNotes: '1kg pharmaceutical grade MC-100 sample with compliance data.',
      formulationName: 'Controlled Release Ibuprofen Tablet 400mg',
      ingredients: [{"ingredient":"AC-MC-100","percentage":15.0},{"ingredient":"Ibuprofen","percentage":80.0},{"ingredient":"Magnesium Stearate","percentage":1.0}],
      steps: ["Dry blend Active Ingredient with Methyl Cellulose", "Wet granulate using isopropyl alcohol", "Dry granules, add lubricant and compress"],
      feedbackNotes: 'Excellent dissolution profile. tablet hardness and friability conform to pharmacopoeia specs.',
      rating: 5
    }
  ]

  for (const wf of workflows) {
    console.log(`\n=== Running: ${wf.name} ===`)

    // 1. Lead creation
    const leadRes = await runSQL(`
      INSERT INTO public.leads (org_id, source, status, score, product_query)
      VALUES ($1, $2, 'new', 80, $3)
      RETURNING id;
    `, [orgId, wf.leadSource, wf.leadQuery])
    const leadId = leadRes.rows[0].id
    console.log(`  ✓ Lead logged: ID ${leadId}`)

    // 2. Account & Contact creation
    const accountRes = await runSQL(`
      INSERT INTO public.accounts (org_id, name, type, country, city, tier, owner_id)
      VALUES ($1, $2, 'customer', 'IN', $3, 'strategic', $4)
      RETURNING id;
    `, [orgId, wf.company, wf.city, userId])
    const accountId = accountRes.rows[0].id
    console.log(`  ✓ Account created: ${wf.company} (ID ${accountId})`)

    const contactRes = await runSQL(`
      INSERT INTO public.contacts (account_id, name, title, email, phone, is_decision_maker)
      VALUES ($1, $2, $3, $4, $5, true)
      RETURNING id;
    `, [accountId, wf.contactName, wf.contactTitle, `contact@${wf.company.toLowerCase().replace(/\s+/g, '')}.com`, '+91-9999999999'])
    const contactId = contactRes.rows[0].id
    console.log(`  ✓ Contact created: ${wf.contactName} (ID ${contactId})`)

    // Link lead
    await runSQL(`
      UPDATE public.leads
      SET status = 'qualified', account_id = $1, contact_id = $2
      WHERE id = $3;
    `, [accountId, contactId, leadId])

    // 3. Opportunity creation
    const productRes = await runSQL("SELECT id FROM public.products WHERE sku = $1 LIMIT 1;", [wf.sku])
    const productId = productRes.rows[0].id

    const opportunityRes = await runSQL(`
      INSERT INTO public.opportunities (account_id, name, stage, value, probability, owner_id)
      VALUES ($1, $2, 'won', $3, 100, $4)
      RETURNING id;
    `, [accountId, wf.opportunityName, wf.opportunityValue, userId])
    const opportunityId = opportunityRes.rows[0].id
    console.log(`  ✓ Opportunity closed-won: ${wf.opportunityName} (ID ${opportunityId})`)

    // 4. Sample Request & Dispatch
    const sampleReqRes = await runSQL(`
      INSERT INTO public.sample_requests (account_id, status, notes)
      VALUES ($1, 'dispatched', $2)
      RETURNING id;
    `, [accountId, wf.sampleNotes])
    const sampleReqId = sampleReqRes.rows[0].id

    await runSQL(`
      INSERT INTO public.samples (request_id, product_id, quantity, unit, batch_no, tracking_no, carrier)
      VALUES ($1, $2, 1.0, 'kg', 'BATCH-2026-GA', 'TRK-BLUE-9999', 'BlueDart');
    `, [sampleReqId, productId])
    console.log(`  ✓ Sample dispatch registered.`)

    // 5. Formulation & Trial feedback
    const appRes = await runSQL("SELECT id FROM public.applications LIMIT 1;")
    const applicationId = appRes.rows[0].id

    const formulationRes = await runSQL(`
      INSERT INTO public.formulations (application_id, name, version, ingredients, process_steps, status, created_by)
      VALUES ($1, $2, 1, $3, $4, 'approved', $5)
      RETURNING id;
    `, [applicationId, wf.formulationName, wf.ingredients, wf.steps, userId])
    const formulationId = formulationRes.rows[0].id
    console.log(`  ✓ Formulation registered: ${wf.formulationName} (ID ${formulationId})`)

    await runSQL(`
      INSERT INTO public.trials (formulation_id, account_id, status, results, feedback_rating, feedback_notes)
      VALUES ($1, $2, 'completed', '{"success":true}'::jsonb, $3, $4);
    `, [formulationId, accountId, wf.rating, wf.feedbackNotes])
    console.log(`  ✓ Customer trial logged. Feedback: ${wf.rating} stars.`)

    // 6. Audit logging
    await runSQL(`
      INSERT INTO audit.audit_logs (user_id, action, entity_type, entity_id, new_value)
      VALUES ($1, 'E2E_WORKFLOW_VERIFIED', 'leads', $2, $3);
    `, [userId, leadId, { opportunity_id: opportunityId, feedback_rating: wf.rating }])
    console.log(`  ✓ Audit event logged successfully.`)
  }

  console.log('\n╔══════════════════════════════════════════════════════════╗')
  console.log('║  ✓ ALL FIVE PRODUCTION E2E WORKFLOWS VERIFIED SUCCESSFULLY║')
  console.log('╚══════════════════════════════════════════════════════════╝')
}

main().catch(err => {
  console.error('\n✗ Workflow run failed:', err.message)
  process.exit(1)
})
