export default function SkeletonLoader() {
  return (
    <div className="work-card-inner skeleton-card" style={{ cursor: 'default' }}>
      <div className="work-list-header" style={{ borderBottom: 'none', paddingBottom: 0 }}>
        <div className="work-title-group" style={{ width: '100%' }}>
          <div className="skeleton-box" style={{ width: '40%', height: '24px', marginBottom: '8px' }}></div>
          <div className="skeleton-box" style={{ width: '20%', height: '16px' }}></div>
        </div>
      </div>
      <div className="work-list-body" style={{ display: 'block', height: 'auto', padding: '0 24px 24px' }}>
        <div className="skeleton-box" style={{ width: '100%', height: '12px', marginTop: '16px' }}></div>
        <div className="skeleton-box" style={{ width: '90%', height: '12px', marginTop: '8px' }}></div>
        <div className="skeleton-box" style={{ width: '70%', height: '12px', marginTop: '8px', marginBottom: '24px' }}></div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div className="skeleton-box" style={{ width: '60px', height: '24px', borderRadius: '999px' }}></div>
          <div className="skeleton-box" style={{ width: '60px', height: '24px', borderRadius: '999px' }}></div>
        </div>
      </div>
    </div>
  );
}
