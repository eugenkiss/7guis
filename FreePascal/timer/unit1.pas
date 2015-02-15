unit Unit1;

{$mode objfpc}{$H+}

interface

uses
  Classes, SysUtils, FileUtil, Forms, Controls, Graphics, Dialogs, StdCtrls,
  ComCtrls, ExtCtrls;

type

  { TForm1 }

  TForm1 = class(TForm)
    Button1: TButton;
    Label1: TLabel;
    Label2: TLabel;
    Label3: TLabel;
    ProgressBar1: TProgressBar;
    Timer1: TTimer;
    TrackBar1: TTrackBar;
    procedure Button1Click(Sender: TObject);
    procedure Timer1Timer(Sender: TObject);
    procedure TrackBar1Change(Sender: TObject);
  private
    { private declarations }
  public
    { public declarations }
  end;

var
  Form1: TForm1;
  i:double=0;
implementation

{$R *.lfm}

{ TForm1 }

procedure TForm1.Timer1Timer(Sender: TObject);
begin
    i:=i+0.1;
    ProgressBar1.Position:=trunc(i/TrackBar1.Position*100);
    Label2.Caption:=inttostr(trunc(i))+'s';
    if trunc(i) >= TrackBar1.Position then Timer1.Enabled:=False;
end;

procedure TForm1.TrackBar1Change(Sender: TObject);
begin
   if TrackBar1.Position > trunc(i) then Timer1.Enabled:=True;
end;

procedure TForm1.Button1Click(Sender: TObject);
begin
   i:=0;
   Label2.Caption:='0';
   Timer1.Enabled:=True;
end;

end.

