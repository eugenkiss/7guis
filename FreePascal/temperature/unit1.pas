unit Unit1;

{$mode objfpc}{$H+}

interface

uses
  Classes, SysUtils, FileUtil, Forms, Controls, Graphics, Dialogs, StdCtrls;

type

  { TForm1 }

  TForm1 = class(TForm)
    TC: TEdit;
    TF: TEdit;
    Label1: TLabel;
    Label2: TLabel;
    procedure TCChange(Sender: TObject);
    procedure TFChange(Sender: TObject);
  private
    { private declarations }
  public
    { public declarations }
  end;

var
  Form1: TForm1;
  DontChange: boolean = True;
  i: integer = 0;

implementation

{$R *.lfm}

{ TForm1 }

procedure TForm1.TFChange(Sender: TObject);
begin
  if DontChange then
  begin
    DontChange := False;
    if trystrtoint(TF.Text, i) then
      TC.Text := IntToStr(trunc((i - 32) * (5 / 9)));
    DontChange := True;
  end;
end;

procedure TForm1.TCChange(Sender: TObject);
begin
  if DontChange then
  begin
    DontChange := False;
    if trystrtoint(TC.Text, i) then
      TF.Text := IntToStr(trunc(i * (9 / 5) + 32));
    DontChange := True;
  end;
end;

end.
