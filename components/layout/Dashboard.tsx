"use client";

import React, { useState } from 'react';
import { MessageSquare, Calendar, PieChart, BellRing, Settings, Menu, Brain, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [menuOpen, setMenuOpen] = useState(false);

  // Mock data for demonstration
  const expenses = [
    { category: 'Housing', amount: 1500 },
    { category: 'Utilities', amount: 200 },
    { category: 'Subscriptions', amount: 50 },
  ];

  const events = [
    { title: 'Business Meeting', date: '2025-02-04 11:00', type: 'meeting' },
    { title: 'Pay Rent', date: '2025-02-01', type: 'payment', amount: 1500 },
    { title: 'Cancel Netflix', date: '2025-02-15', type: 'task' },
  ];

  const ChatView = () => (
    <div className="space-y-4">
      <div className="h-96 bg-brand-teal/5 rounded-lg p-4 overflow-y-auto">
        {/* Chat messages would go here */}
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="How can I help you today?"
          className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
        />
        <button className="p-2 bg-brand-green hover:bg-brand-green/90 text-white rounded-lg">
          Send
        </button>
      </div>
    </div>
  );

  const CalendarView = () => (
    <div className="grid grid-cols-7 gap-1">
      {Array.from({ length: 31 }, (_, i) => (
        <div 
          key={i} 
          className="aspect-square border rounded p-1 text-sm hover:bg-brand-teal/5"
        >
          <div className="font-bold">{i + 1}</div>
          {events.filter(e => new Date(e.date).getDate() === i + 1).map((event, idx) => (
            <div 
              key={idx} 
              className={`text-xs p-1 mt-1 rounded ${
                event.type === 'meeting' ? 'bg-brand-teal/20' :
                event.type === 'payment' ? 'bg-brand-green/20' :
                'bg-gray-100'
              }`}
            >
              {event.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  const FinanceView = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Spend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-green">$1,750</div>
            <div className="text-sm text-brand-navy/60">This Month</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Budget Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-green">On Track</div>
            <div className="text-sm text-brand-navy/60">15% under budget</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Bills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-green">3</div>
            <div className="text-sm text-brand-navy/60">Next 7 days</div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Expense Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {expenses.map((expense, idx) => (
              <div key={idx} className="flex justify-between items-center p-2 bg-brand-teal/5 rounded hover:bg-brand-teal/10">
                <span className="text-brand-navy">{expense.category}</span>
                <span className="font-bold text-brand-green">${expense.amount}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const EmailView = () => {
    const [selectedFolder, setSelectedFolder] = useState('inbox');
    
    const emails = [
      { 
        sender: 'Bank of America',
        subject: 'Your Monthly Statement',
        preview: 'Your monthly statement for ending in *4589 is now available...',
        date: '2025-02-01 09:15',
        isRead: false,
        isStarred: true
      },
      {
        sender: 'John Smith',
        subject: 'Project Deadline Update',
        preview: 'Team, I wanted to discuss the upcoming deadline for...',
        date: '2025-02-02 14:30',
        isRead: true,
        isStarred: false
      }
    ];
    
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-12 gap-4">
          {/* Email Sidebar */}
          <div className="col-span-3 bg-white rounded-lg p-4">
            <button className="w-full bg-brand-green hover:bg-brand-green/90 text-white rounded-lg p-2 mb-4">
              Compose
            </button>
            {['Inbox', 'Starred', 'Sent', 'Drafts'].map((folder) => (
              <button
                key={folder}
                onClick={() => setSelectedFolder(folder.toLowerCase())}
                className={`w-full text-left p-2 rounded-lg ${
                  selectedFolder === folder.toLowerCase()
                    ? 'bg-brand-green/10 text-brand-green'
                    : 'hover:bg-brand-teal/5'
                }`}
              >
                {folder}
              </button>
            ))}
          </div>

          {/* Email List */}
          <div className="col-span-9 space-y-2">
            {emails.map((email, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg cursor-pointer ${
                  !email.isRead ? 'bg-brand-green/10' : 'hover:bg-brand-teal/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-medium ${!email.isRead ? 'text-brand-navy' : 'text-brand-navy/60'}`}>
                    {email.sender}
                  </span>
                  <span className="text-sm text-brand-navy/60">
                    {new Date(email.date).toLocaleTimeString()}
                  </span>
                </div>
                <div className="text-sm font-medium text-brand-navy">{email.subject}</div>
                <div className="text-sm text-brand-navy/60 truncate">{email.preview}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const MemoryBankView = () => {
    const memories = [
      {
        type: 'subscription',
        detail: 'Netflix subscription - $15.99/month',
        dateStored: '2025-01-15',
        nextAction: '2025-02-15'
      },
      {
        type: 'contact',
        detail: 'Dr. Smith Office - (555) 123-4567',
        dateStored: '2025-01-20'
      },
      {
        type: 'preference',
        detail: 'Always book window seats on flights',
        dateStored: '2025-01-10'
      }
    ];

    return (
      <div className="space-y-4">
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            placeholder="Search stored memories..."
            className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
          />
          <select className="p-2 border rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green">
            <option value="all">All Types</option>
            <option value="subscription">Subscriptions</option>
            <option value="contact">Contacts</option>
            <option value="preference">Preferences</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {memories.map((memory, idx) => (
            <Card key={idx}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="font-medium capitalize text-brand-navy">{memory.type}</div>
                  <div className="text-xs text-brand-navy/60">
                    Stored: {new Date(memory.dateStored).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-sm text-brand-navy">{memory.detail}</div>
                {memory.nextAction && (
                  <div className="mt-2 text-xs bg-brand-green/10 text-brand-green p-2 rounded">
                    Next action: {new Date(memory.nextAction).toLocaleDateString()}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const NotificationsView = () => (
    <div className="space-y-4">
      {events.map((event, idx) => (
        <Card key={idx}>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className={`p-2 rounded-full ${
              event.type === 'meeting' ? 'bg-brand-teal/20' :
              event.type === 'payment' ? 'bg-brand-green/20' :
              'bg-gray-100'
            }`}>
              {event.type === 'meeting' ? '🤝' : 
               event.type === 'payment' ? '💰' : '✓'}
            </div>
            <div>
              <div className="font-bold text-brand-navy">{event.title}</div>
              <div className="text-sm text-brand-navy/60">
                {new Date(event.date).toLocaleDateString()}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <div className="bg-brand-navy border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 hover:bg-brand-navy/80 rounded-lg md:hidden text-white"
              >
                <Menu className="w-6 h-6" />
              </button>
              <span className="font-bold text-xl text-brand-green">MintUp AI</span>
            </div>
            <button className="p-2 hover:bg-brand-navy/80 rounded-lg text-white">
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex">
          {/* Sidebar Navigation */}
          <div className={`${
            menuOpen ? 'block' : 'hidden'
          } md:block fixed md:relative top-0 left-0 h-full md:h-auto z-50 bg-white md:bg-transparent`}>
            <div className="w-64 space-y-2 p-4">
              {[
                { icon: MessageSquare, label: 'Chat', id: 'chat' },
                { icon: Calendar, label: 'Calendar', id: 'calendar' },
                { icon: PieChart, label: 'Finance', id: 'finance' },
                { icon: BellRing, label: 'Notifications', id: 'notifications' },
                { icon: Mail, label: 'Email', id: 'email' },
                { icon: Brain, label: 'Memory Bank', id: 'memory' },
              ].map(({ icon: Icon, label, id }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center space-x-2 p-2 rounded-lg ${
                    activeTab === id 
                      ? 'bg-brand-green text-white'
                      : 'hover:bg-brand-teal/10 text-brand-navy'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 ml-0 md:ml-8">
            <Card>
              <CardHeader>
                <CardTitle>
                  {activeTab === 'chat' && 'AI Assistant'}
                  {activeTab === 'calendar' && 'Calendar'}
                  {activeTab === 'finance' && 'Financial Overview'}
                  {activeTab === 'notifications' && 'Notifications'}
                  {activeTab === 'email' && 'Important Communications'}
                  {activeTab === 'memory' && 'Memory Bank'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {activeTab === 'chat' && <ChatView />}
                {activeTab === 'calendar' && <CalendarView />}
                {activeTab === 'finance' && <FinanceView />}
                {activeTab === 'notifications' && <NotificationsView />}
                {activeTab === 'email' && <EmailView />}
                {activeTab === 'memory' && <MemoryBankView />}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;