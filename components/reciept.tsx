export default function Receipt() {
    return (
      <div className="max-w-[800px] mx-auto p-6 bg-white">
        {/* Header */}
        <div className="flex items-start justify-between border-b-2 border-teal-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-teal-800 text-white flex items-center justify-center rounded">
              <span className="text-xs text-center">LOGO HERE</span>
            </div>
            <div>
              <h1 className="font-bold text-xl uppercase">Company Name Here</h1>
              <p className="text-sm text-gray-600">Your Business Address 0000, Main Street, Unit 0000 FEL, 0000</p>
              <p className="text-sm text-gray-600">Mob: 0123 4567890/Email: Your@MailHere</p>
            </div>
          </div>
        </div>
  
        {/* Invoice Title */}
        <div className="bg-teal-800 text-white px-4 py-2 mt-4 inline-block">
          <h2 className="text-lg">Invoice / Bill</h2>
        </div>
  
        {/* Customer Details */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <div className="flex gap-2">
              <span className="min-w-[80px]">Sl. No:</span>
              <div className="border-b border-gray-400 flex-1"></div>
            </div>
            <div className="flex gap-2">
              <span className="min-w-[80px]">Name:</span>
              <div className="border-b border-gray-400 flex-1"></div>
            </div>
            <div className="flex gap-2">
              <span className="min-w-[80px]">Address:</span>
              <div className="border-b border-gray-400 flex-1"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex gap-2">
              <span className="min-w-[80px]">Date:</span>
              <div className="border-b border-gray-400 flex-1"></div>
            </div>
            <div className="flex gap-2">
              <span className="min-w-[80px]">Mobile:</span>
              <div className="border-b border-gray-400 flex-1"></div>
            </div>
            <div className="flex gap-2">
              <span className="min-w-[80px]">Email:</span>
              <div className="border-b border-gray-400 flex-1"></div>
            </div>
          </div>
        </div>
  
        {/* Items Table */}
        <div className="mt-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-teal-800 text-white">
                <th className="border border-teal-700 px-4 py-2 text-left">Sl. No</th>
                <th className="border border-teal-700 px-4 py-2 text-left">Description</th>
                <th className="border border-teal-700 px-4 py-2 text-left">Quantity</th>
                <th className="border border-teal-700 px-4 py-2 text-left">Rate</th>
                <th className="border border-teal-700 px-4 py-2 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">&nbsp;</td>
                  <td className="border border-gray-300 px-4 py-2">&nbsp;</td>
                  <td className="border border-gray-300 px-4 py-2">&nbsp;</td>
                  <td className="border border-gray-300 px-4 py-2">&nbsp;</td>
                  <td className="border border-gray-300 px-4 py-2">&nbsp;</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        {/* Totals */}
        <div className="flex justify-end mt-4">
          <div className="w-48">
            <div className="flex justify-between border-b border-gray-300 py-1">
              <span>Sub Total</span>
              <span></span>
            </div>
            <div className="flex justify-between border-b border-gray-300 py-1">
              <span>Advance</span>
              <span></span>
            </div>
            <div className="flex justify-between border-b border-gray-300 py-1">
              <span>Due</span>
              <span></span>
            </div>
          </div>
        </div>
  
        {/* In Words */}
        <div className="mt-4">
          <div className="flex gap-2">
            <span>In Words:</span>
            <div className="border-b border-gray-400 flex-1"></div>
          </div>
        </div>
  
        {/* Footer */}
        <div className="flex justify-between mt-8 pt-8">
          <div>
            <div className="border-t border-gray-400 pt-1 w-48 text-center">Received by</div>
          </div>
          <div>
            <div className="border-t border-gray-400 pt-1 w-48 text-center">Authorized by</div>
          </div>
        </div>
      </div>
    )
  }
  
  