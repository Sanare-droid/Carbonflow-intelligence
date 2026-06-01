'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { mockDocuments } from '@/lib/mock-data';
import { FileUp, Search, Filter, Download, Trash2 } from 'lucide-react';

const categories = ['All', 'Technical', 'Environmental', 'Social', 'Legal', 'Monitoring', 'Audit'];

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Technical: 'bg-blue-100 text-blue-800',
      Environmental: 'bg-emerald-100 text-emerald-800',
      Social: 'bg-purple-100 text-purple-800',
      Legal: 'bg-orange-100 text-orange-800',
      Monitoring: 'bg-yellow-100 text-yellow-800',
      Audit: 'bg-red-100 text-red-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Verified':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Pending Review':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
          <p className="text-muted-foreground mt-1">Manage all project documentation and files</p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-secondary">
          <FileUp className="w-4 h-4" />
          Upload Document
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search documents..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
        </div>

        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button key={category} variant={selectedCategory === category ? 'default' : 'outline'} size="sm" onClick={() => setSelectedCategory(category)}>
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Documents Table */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>All Documents</CardTitle>
          <CardDescription>{filteredDocuments.length} documents found</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredDocuments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Name</th>
                    <th className="text-left py-3 px-4 font-semibold">Category</th>
                    <th className="text-left py-3 px-4 font-semibold">Project</th>
                    <th className="text-left py-3 px-4 font-semibold">Size</th>
                    <th className="text-left py-3 px-4 font-semibold">Uploaded</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                    <th className="text-right py-3 px-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDocuments.map((doc) => (
                    <tr key={doc.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4">{doc.name}</td>
                      <td className="py-3 px-4">
                        <Badge className={getCategoryColor(doc.category)}>{doc.category}</Badge>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{doc.projectId}</td>
                      <td className="py-3 px-4 text-muted-foreground">{doc.size}MB</td>
                      <td className="py-3 px-4 text-muted-foreground">{doc.uploadDate.toLocaleDateString()}</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className={getStatusColor(doc.status)}>
                          {doc.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">No documents found matching your search</div>
          )}
        </CardContent>
      </Card>

      {/* Storage Info */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Storage Usage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Used Space</span>
              <span className="font-semibold">
                {filteredDocuments.reduce((sum, doc) => sum + doc.size, 0).toFixed(1)}GB / 100GB
              </span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary"
                style={{ width: `${(filteredDocuments.reduce((sum, doc) => sum + doc.size, 0) / 100) * 100}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
