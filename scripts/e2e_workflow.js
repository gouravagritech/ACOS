/**
 * ACOS Production E2E Business Workflow Validation (API-based)
 * Uses Supabase Management API to execute queries over HTTPS
 */

const PAT = process.env.SUPABASE_PAT || ''
const PROJECT_REF = 'arvtqnmgicovbszypspz'
const BASE_URL = `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`

async function runSQL(sql, params = []) {
  // Format parameters by replacing $1, $2, etc. with values in SQL (since DB query API takes literal SQL)
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
  console.log('=== ACOS Production E2E Business Workflow Validation (HTTPS Mode) ===\n')

  const orgId = '00000000-0000-0000-0000-000000000001' // Aqua Colloids Org

  // 1. Insert a new lead from the website CMS
  console.log('[STEP 1] Simulating website lead generation...')
  const leadRes = await runSQL(`
    INSERT INTO public.leads (org_id, source, status, score, product_query)
    VALUES ($1, 'website', 'new', 85, $2)
    RETURNING id, product_query;
  `, [orgId, 'Requesting Xanthan Gum food grade sample for new dressing line formulation.'])
  const lead = leadRes.rows[0]
  console.log(`  ✓ Lead created. ID: ${lead.id}`)

  // 2. Qualify lead and create Account + Contact
  console.log('\n[STEP 2] Qualifying lead and generating Account + Contact...')
  const accountRes = await runSQL(`
    INSERT INTO public.accounts (org_id, name, type, country, city, tier)
    VALUES ($1, 'Hindustan Food Processing Ltd', 'customer', 'IN', 'Mumbai', 'strategic')
    RETURNING id, name;
  `, [orgId])
  const account = accountRes.rows[0]
  console.log(`  ✓ Account created: ${account.name} (ID: ${account.id})`)

  const contactRes = await runSQL(`
    INSERT INTO public.contacts (account_id, name, title, email, phone, is_decision_maker)
    VALUES ($1, 'Dr. Amit Sharma', 'Head of R&D', 'amit.sharma@hindustanfoods.co.in', '+91-9876543210', true)
    RETURNING id, name;
  `, [account.id])
  const contact = contactRes.rows[0]
  console.log(`  ✓ Contact created: ${contact.name} (ID: ${contact.id})`)

  // Update lead status to qualified linking to Account/Contact
  await runSQL(`
    UPDATE public.leads
    SET status = 'qualified', account_id = $1, contact_id = $2
    WHERE id = $3;
  `, [account.id, contact.id, lead.id])
  console.log('  ✓ Lead converted and linked successfully.')

  // 3. Create Commercial Opportunity
  console.log('\n[STEP 3] Opening commercial opportunity...')
  // Retrieve a product to link
  const productRes = await runSQL("SELECT id, name, sku FROM public.products WHERE sku = 'AC-XG-100' LIMIT 1;")
  const product = productRes.rows[0]
  console.log(`  ✓ Linked product identified: ${product.name} (${product.sku})`)

  const userId = '00000000-0000-0000-0000-000000000002'
  await runSQL(`
    INSERT INTO public.users (id, org_id, email, full_name, role_id)
    VALUES ($1, $2, 'sales.manager@aquacolloids.com', 'Gourav Sales Manager', 'sales_manager')
    ON CONFLICT (id) DO UPDATE SET full_name = 'Gourav Sales Manager';
  `, [userId, orgId])
  console.log(`  ✓ Sales Manager user initialized: Gourav Sales Manager (ID: ${userId})`)

  const opportunityRes = await runSQL(`
    INSERT INTO public.opportunities (account_id, name, stage, value, probability, owner_id)
    VALUES ($1, 'Hindustan Foods - Xanthan Gum 10MT Contract', 'qualification', 1800000.00, 40, $2)
    RETURNING id, name, value, currency;
  `, [account.id, userId])
  const opp = opportunityRes.rows[0]
  console.log(`  ✓ Opportunity opened: ${opp.name} for ${opp.value} ${opp.currency} (ID: ${opp.id})`)

  // 4. Create Sample Request & Dispatch
  console.log('\n[STEP 4] Logging sample request and dispatch workflow...')
  const sampleReqRes = await runSQL(`
    INSERT INTO public.sample_requests (account_id, status, notes)
    VALUES ($1, 'approved', 'Approved 1kg trial sample of AC-XG-100.')
    RETURNING id;
  `, [account.id])
  const sampleReq = sampleReqRes.rows[0]

  const sampleRes = await runSQL(`
    INSERT INTO public.samples (request_id, product_id, quantity, unit, batch_no, tracking_no, carrier)
    VALUES ($1, $2, 1000.00, 'grams', 'B-XG100-202607', 'TRK-ACOS-880415', 'BlueDart')
    RETURNING id, batch_no;
  `, [sampleReq.id, product.id])
  const sample = sampleRes.rows[0]
  console.log(`  ✓ Sample request logged and approved. Dispatch sample registered (Batch: ${sample.batch_no})`)

  // 5. Formulation & Trial feedback
  console.log('\n[STEP 5] Documenting customer application formulation trial...')
  // Select first application
  const appRes = await runSQL("SELECT id, name FROM public.applications LIMIT 1;")
  const application = appRes.rows[0]

  const formulationRes = await runSQL(`
    INSERT INTO public.formulations (application_id, name, version, ingredients, process_steps, status, created_by)
    VALUES ($1, 'Salad Dressing - Low Fat Stabilized', 1, 
      $2,
      $3,
      'approved', $4)
    RETURNING id, name;
  `, [application.id, 
      [{"ingredient":"AC-XG-100","percentage":0.35},{"ingredient":"Water","percentage":65.0},{"ingredient":"Oil","percentage":25.0}],
      ["Hydrate Xanthan Gum in water for 15 mins", "Slowly add oil under high shear", "Adjust pH and add spices"],
      userId])
  const formulation = formulationRes.rows[0]
  console.log(`  ✓ Trial Formulation documented: ${formulation.name} (ID: ${formulation.id})`)

  const trialRes = await runSQL(`
    INSERT INTO public.trials (formulation_id, account_id, status, results, feedback_rating, feedback_notes)
    VALUES ($1, $2, 'completed', 
      $3,
      5, 'The AC-XG-100 performed exceptionally well. High yield stress suspended herbs perfectly without masking flavor.')
    RETURNING id, feedback_rating;
  `, [formulation.id, account.id, {"viscosity_stable":true,"phase_separation":false,"mouthfeel":"excellent"}])
  const trial = trialRes.rows[0]
  console.log(`  ✓ Customer trial completed. Rating: ${trial.feedback_rating} Stars! Notes: Verified phase stability.`)

  // 6. Log Audit Event
  console.log('\n[STEP 6] Logging security/system audit event...')
  await runSQL(`
    INSERT INTO audit.audit_logs (user_id, action, entity_type, entity_id, new_value)
    VALUES ($1, 'QUALIFY_LEAD_E2E', 'leads', $2, $3);
  `, [userId, lead.id, { status: 'qualified', account_id: account.id, opportunity_id: opp.id }])
  console.log('  ✓ System audit log registered.')

  console.log('\n╔══════════════════════════════════════════════════════════╗')
  console.log('║  ✓ E2E BUSINESS WORKFLOW TRANSACTION TESTED SUCCESSFULLY  ║')
  console.log('╚══════════════════════════════════════════════════════════╝')
}

main().catch(err => {
  console.error('\n✗ E2E workflow failed:', err.message)
  process.exit(1)
})
