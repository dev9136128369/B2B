// app/api/update-lead/[id]/route.js
import connectMongo from '@/app/lib/mongodb';
import Lead from '@/models/Lead';

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const { status } = await request.json();

    if (!['Pending', 'Won'].includes(status)) {
      return new Response(JSON.stringify({ error: 'Invalid status value' }), {
        status: 400
      });
    }

    await connectMongo();

    const updatedLead = await Lead.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedLead) {
      return new Response(JSON.stringify({ error: 'Lead not found' }), {
        status: 404
      });
    }

    return new Response(JSON.stringify({ success: true, lead: updatedLead }), {
      status: 200
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500
    });
  }
}
